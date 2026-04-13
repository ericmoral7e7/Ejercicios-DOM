import express from 'express';
import { Worker } from 'worker_threads';

const app = express();
const PORT = 3002;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});

let entrenosActivos = 0;

app.get('/entreno/:nombre', (req, res) => {

    entrenosActivos++;

    const nombre = req.params.nombre
    const peso = Number(req.query.peso)
    const altura = Number(req.query.altura)

    console.log(`${nombre} ${peso} ${altura}`)
    // Crea el worker y le pasa los datos
    const worker = new Worker('./calcular-entreno.js', {
        workerData: { nombre, peso, altura }            // ← pasa objetos directamente (no solo strings)
    });

    // Escucha el resultado
    worker.on('message', (datos) => {
        entrenosActivos--;
        res.json(datos);                   // → { resultado: 15 }
    });

    // Gestiona errores
    worker.on('error', (err) => {
        entrenosActivos--;
        res.status(500).json({ error: err.message });
    });

});

app.get('/ping', (req, res) => {
    res.json({ estado: "Activo" });
})

app.get('/usuarios-activos', (req, res) => {
    res.json({entrenosActivos: entrenosActivos});
})