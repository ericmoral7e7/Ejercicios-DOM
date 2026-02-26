const { createServer } = require('node:http');
// const { useLayoutEffect } = require('react');

const hostname = '127.0.0.1';
const port = 3001;

// Datos simulados --> como si fuera lo que nos devuelve la BDD
let students = [
    { id: "A001", nombre: "Abril", curso: "1º DAW" },
    { id: "A002", nombre: "Marc", curso: "1º DAM" }
];

// Devuelve JSON
function sendJson(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(data));
}



const server = createServer((req, res) => {

    console.log(req.method, req.url);

    // GET /students
    if (req.method === "GET" && req.url === "/students") {
        return sendJson(res, 200, students);
    }

    // TODO 1: GET /students/:id
    //Buscamos la info de un alumno completo.
    if (req.method === "GET" && req.url.startsWith("/students/")) {

        // 1. Extraer id de la URL
        let id = extraerIdStudent(req.url)

        // 2. Buscar alumno en el array
        let studentBuscado = students.find((student) => student.id === id)

        // 3. Si no existe → 404
        if (!studentBuscado) {
            return sendJson(res, 404, { error: "Alumno no encontrado" });
        }
        // 4. Si existe → devolver 200 + alumno
        return sendJson(res, 200, studentBuscado);
    }

    // TODO 2: DELETE /students/:id
    if (req.method === "DELETE" && req.url.startsWith("/students/")) {

        // 1. Extraer id
        let id = extraerIdStudent(req.url)

        // 2. Comprobar si existe
        let studentBuscado = students.find((student) => student.id === id)
        if (!studentBuscado) {// 4. Si no existe → 404
            return sendJson(res, 404, { error: "Alumno no encontrado" });
        }

        // 3. Eliminarlo del array
        students = students.filter((student) => student !== studentBuscado);

        // 5. Si se elimina → 204 (sin body)
        return sendJson(res, 204);

    }
    // TODO 3: POST /students
    if (req.method === "POST" && req.url === "/students") {

        // 1. Leer el body con readBody() --> Es donde esta toda la info del nuevo alumno.
        readBody(req, (err, alumno) => {

            // 2. Validar que tenga id, nombre y curso
            if (!alumno.hasOwnProperty("id") || !alumno.hasOwnProperty("nombre") || !alumno.hasOwnProperty("curso")) {
                return sendJson(res, 400, { error: "Faltan campos obligatorios" });
            }
            // 3. Comprobar que el id no esté repetido
            let existe = students.find((student) => student.id === alumno.id)
            if (existe) return sendJson(res, 409, { error: "El ID ya existe" });


            // 4. Añadir al array students
            students.push(alumno)
            // 5. Devolver 201 + alumno creado
            return sendJson(res, 201, alumno);
        })
    }

    // TODO 4: PUT /students/:id
    if (req.method === "PUT" && req.url.startsWith("/students/")) {

        // 1. Extraer id
        let id = extraerIdStudent(req.url)

        // 2. Buscar alumno
        let studentBuscado = students.find((student) => student.id === id)

        // 3. Si no existe → 404
        if (!studentBuscado) {
            return sendJson(res, 404, { error: "Alumno no encontrado" });
        }

        // 4. Leer body con readBody() --> Ahora será otra callback!!!
        // 4. Leer body
        readBody(req, (err, alumnoActualizado) => {

            if (err) {
                return sendJson(res, 400, { error: "JSON inválido" });
            }

            // 5. Actualizar solo los campos enviados
            if (alumnoActualizado.hasOwnProperty("nombre")) {
                studentBuscado.nombre = alumnoActualizado.nombre;
            }

            if (alumnoActualizado.hasOwnProperty("curso")) {
                studentBuscado.curso = alumnoActualizado.curso;
            }

            // 6. Devolver 200 + alumno actualizado
            return sendJson(res, 200, studentBuscado);

        });
    }

    // Si no coincide ningún endpoint
    sendJson(res, 404, { message: `Not Found ${req.url}` });

});

function extraerIdStudent(url) {
    let urlSplited = url.split("/")
    return urlSplited[2]
}


/* TODO: Crear función que lea el body y devuelva el JSON parseado
En Node puro, el body no viene empaquetado.
Llega en trozos.
Tenemos que montarlo nosotros.*/
function readBody(req, callback) {
    let body = "";

    req.on("data", chunk => {
        //Vamos obteniendo los trozos
        body += chunk;
    });

    req.on("end", () => {
        try {
            const alumnoNew = JSON.parse(body);
            //Aquí ya tenemos al alumno.
            callback(null, alumnoNew);
        } catch (err) {
            callback(err);
        }
    });
}

//TODO las funciones callback necesarias.

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});