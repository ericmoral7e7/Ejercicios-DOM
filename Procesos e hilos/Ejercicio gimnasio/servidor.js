import express from 'express';
import { Worker } from 'worker_threads';

const app = express();
const PORT = 3001;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});


app.get('/entreno/:nombre', (req, res) => {
    const nombre = req.params.nombre

    // Crea el worker y le pasa los datos
    const worker = new Worker('./calcular-entreno.js', {
        workerData: { nombre }            // ← pasa objetos directamente (no solo strings)
    });

    // Escucha el resultado
    worker.on('message', (datos) => {
        res.json(datos);                   // → { resultado: 15 }
    });

    // Gestiona errores
    worker.on('error', (err) => {
        res.status(500).json({ error: err.message });
    });

});

app.get('/ping', (req, res) => {
    res.json(JSON.parse({ servidor: "vivo" }));
})

app.get('/usuarios-activos', (req, res) => {
    res.json(JSON.parse({ servidor: "vivo" }));
})