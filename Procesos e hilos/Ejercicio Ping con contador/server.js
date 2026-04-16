import { spawn } from 'child_process';
import express from 'express';

const app = express();
const PORT = 3001;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});

app.get('/spawn', (req, res) => {

    // Le decimos al sistema: "Haz solo 5 pings y cierra la manguera"
    const procesoPing = spawn('ping', ['google.com']);

    // Preparamos la cabecera para que el navegador sepa que va a recibir datos poco a poco
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    let contador = 0

    // Escuchamos el hilo de datos de salida
    procesoPing.stdout.on('data', (pedacito) => {
        // Nos va llegando la información línea a línea o por bloques
        console.log(`Recibido: ${pedacito.toString()}`);
        contador++
        if (contador >= 5) {
            procesoPing.kill('SIGTERM')
        }
        res.write(`Dato recibido: ${pedacito.toString()}`); // Escribe en la respuesta sin cerrarla
    });

    // Escuchamos si el proceso termina
    procesoPing.on('close', (codigo) => {
        console.log(`El proceso terminó con código ${codigo}`);
        res.end('Proceso ping terminado.'); // Cerramos la respuesta al cliente
    });

    procesoPing.stderr.on('data', (data) => {
        console.error(`Error en el hijo: ${data}`);
        res.status(500).json({ error: 'Fallo al hacer ping' });
    });
});
