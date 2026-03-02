// Importamos Express usando ES Modules
import express from "express";
//const { express } = require('express');

// Creamos la instancia de la aplicación Express
const app = express();

// Definimos el puerto en una constante para facilitar su configuración
const PORT = 3000;

// Datos simulados --> como si fuera lo que nos devuelve la BDD
let students = [
  { id: "A001", nombre: "Abril", curso: "1º DAW" },
  { id: "A002", nombre: "Marc", curso: "1º DAM" }
];

// GET /students
app.get("/students", (req, res) => {
    res.json(students);
});

// GET /students/:id
app.get("/students/:id", (req, res) => {
   // 1. Extraer id de la URL. Buscar alumno en el array
   const student = students.find(s > s.id === req.params.id);
   // 3. Si no existe → 404
   if (!student) return res.status(404).json({ message: "Not Found" });
   res.json(student);
});

app.delete("/students/:id", (req, res) => {
   // 1. Extraer id de la URL. Buscar alumno en el array
   const student = students.find(s > s.id === req.params.id);
   
   
});



// Iniciamos el servidor y escuchamos en el puerto definido
app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
