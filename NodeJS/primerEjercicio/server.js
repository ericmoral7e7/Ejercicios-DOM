import { createServer } from 'node:http';
//const { createServer } = require('node:http');

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

// Helper: valida campos mínimos
function validateStudent(obj) {
  if (!obj || typeof obj !== "object") return "Body inválido";
  if (!obj.id || !obj.nombre || !obj.curso) return "Faltan campos: id, nombre, curso";
  return null;
}

// Helper: comprueba id único
function existsId(id) {
  return students.some(s => s.id === id);
}

const server = createServer(async (req, res) => {

  console.log(req.method, req.url);

  // GET /students
  if (req.method === "GET" && req.url === "/students") {
    return sendJson(res, 200, students);
  }

  // TODO 1: GET /students/:id
  //Buscamos la info de un alumno completo.
  if (req.method === "GET" && req.url.startsWith("/students/")) {

    // 1. Extraer id de la URL
    const id = req.url.split("/")[2];

    // 2. Buscar alumno en el array
    const student = students.find(s => s.id === id);

    // 3. Si no existe → 404
    if (!student) {
      return sendJson(res, 404, { message: "Not Found" });
    }

    // 4. Si existe → devolver 200 + alumno
    return sendJson(res, 200, student);
  }

  // TODO 2: DELETE /students/:id
  if (req.method === "DELETE" && req.url.startsWith("/students/")) {

    // 1. Extraer id
    const id = req.url.split("/")[2];

    // 2. Comprobar si existe
    const before = students.length;

    // 3. Eliminarlo del array
    students = students.filter(s => s.id !== id);

    // 4. Si no existe → 404
    if (students.length === before) {
      return sendJson(res, 404, { message: "Not Found" });
    }

    // 5. Si se elimina → 204 (sin body)
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.end();
  }

  // TODO 3: POST /students
  if (req.method === "POST" && req.url === "/students") {
    // 1. Leer el body con readBody()
    try {
      const alumnoNew = await readBody(req);

      // 2. Validar que tenga id, nombre y curso
      const validationMsg = validateStudent(alumnoNew);
      if (validationMsg) return sendJson(res, 400, { message: validationMsg });

      // 3. Comprobar que el id no esté repetido
      if (existsId(alumnoNew.id)) return sendJson(res, 409, { message: "id ya existe" });

      // 4. Añadir al array students
      students.push({ id: alumnoNew.id, nombre: alumnoNew.nombre, curso: alumnoNew.curso });
      return sendJson(res, 201, { message: "Created", student: alumnoNew });

    } catch {
      //Si hay algún error.
      return sendJson(res, 400, { message: "JSON inválido" });
    }
  }


  // TODO 4: PUT /students/:id
  if (req.method === "PUT" && req.url.startsWith("/students/")) {

    // 1. Extraer id
    const id = req.url.split("/")[2];

    // 2. Buscar alumno
    const idx = students.findIndex(s => s.id === id);

    // 3. Si no existe → 404
    if (idx === -1) {
      return sendJson(res, 404, { message: "Not Found" });
    }

    try {
      // 4. Leer body con readBody() q es ASINCRONO
      const payload = await readBody(req);

      // 5. Actualizar campos enviados
      // (Actualización parcial: si viene nombre/curso, lo actualizamos)
      if (payload && typeof payload === "object") {
        if (payload.nombre !== undefined) students[idx].nombre = payload.nombre;
        if (payload.curso !== undefined) students[idx].curso = payload.curso;
      }
      // 6. Devolver 200 + alumno actualizado
      return sendJson(res, 200, students[idx]);

    } catch {
      //Si hay algún error
      return sendJson(res, 400, { message: "JSON inválido" });
    }
  }

  // Si no coincide ningún endpoint
  sendJson(res, 404, { message: "Not Found" });

});


/* TODO: Crear función que lea el body y devuelva el JSON parseado
En Node puro, el body no viene empaquetado.
Llega en trozos.
Tenemos que montarlo nosotros.*/
/*function readBody(req, callback) {
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
}*/


//MEJOR usando PROMESAS
// Lee el body y devuelve el JSON parseado como Promise (en lugar de callbacks)
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
}

//TODO las funciones callback necesarias.

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});