import cluster from 'cluster';
import os from 'os';
import express from 'express';

const NUM_CPUS = os.cpus().length;
console.log(`Servidor arrancado con ${NUM_CPUS} núcleos disponibles.`);

// ── MASTER ────────────────────────────────────────────────────────────────
if (cluster.isPrimary) {

    console.log(`Master ${process.pid} arrancado — creando ${NUM_CPUS} workers...`);

    // Crear un worker por cada núcleo disponible
    for (let i = 0; i < NUM_CPUS; i++) {
        cluster.fork();
    }

    // Si un worker muere por cualquier motivo → crear uno nuevo
    cluster.on('exit', (worker, code, signal) => {
        console.warn(`Worker ${worker.process.pid} murió (${signal || code}). Reiniciando...`);
        cluster.fork();
    });

    // ── WORKER ────────────────────────────────────────────────────────────────
} else {

    const app = express();
    const PORT = 3001;

    app.get('/health', (req, res) => {
        res.json({ status: 'ok', pid: process.pid });
    });

    app.listen(PORT, () => {
        console.log('Servidor arrancado dentro del cluster');
    });
}