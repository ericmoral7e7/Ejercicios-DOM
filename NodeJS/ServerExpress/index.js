// Importamos Express usando ES Modules
import express from "express";
//const { express } = require('express');

// Creamos la instancia de la aplicación Express
const app = express();
app.use(express.json());

// Definimos el puerto en una constante para facilitar su configuración
const PORT = 3000;

// Datos simulados --> como si fuera lo que nos devuelve la BDD
let students = [
   { id: "A001", nombre: "Abril", curso: "1º DAW" },
   { id: "A002", nombre: "Marc", curso: "1º DAM" }
];

// function existsId(id) {
//   return students.some(s => s.id === id);
// }

// GET /students
app.get("/students", (req, res) => {
   res.json(students);
});

// GET /students/:id
app.get("/students/:id", (req, res) => {
   // 1. Extraer id de la URL. Buscar alumno en el array
   const student = students.find(s => s.id === req.params.id);
   // 3. Si no existe → 404
   if (!student) return res.status(404).json({ message: "Not Found" });
   res.json(student);
});

app.delete("/students/:id", (req, res) => {
   const before = students.length;
   students = students.filter(s => s.id !== req.params.id);

   if (students.length === before) {
      return res.status(404).json({ message: "Not Found" });
   }

   return res.status(204).json({ message: "Deleted correctly" })
});


app.post("/students", (req, res) => {
   let newAlumno = req.body
   if (!newAlumno.id || !newAlumno.nombre || !newAlumno.curso) {
      return res.status(400).json({ message: "Faltan campos: id, nombre, curso" });
   }


   const existe = students.some(s => s.id === newAlumno.id);
   if (existe) {
      return res.status(409).json({ message: "El ID ya existe" });
   }

   students.push(newAlumno)
   return res.status(201).json({ message: "Created", student: newAlumno });
});

app.put("/students/:id", (req, res) => {
   const newInfo = req.body;
   const alumno = students.find(s => s.id === req.params.id);

   if (!alumno) {
      return res.status(404).json({ message: "Not Found" });
   }
   if (!newInfo.nombre || !newInfo.curso) {
      return res.status(400).json({ message: "Faltan campos: id, nombre, curso" });
   }

   alumno.nombre = newInfo.nombre
   alumno.curso = newInfo.curso

   return res.status(200).json(alumno);
})

// Iniciamos el servidor y escuchamos en el puerto definido
app.listen(PORT, () => {
   console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
