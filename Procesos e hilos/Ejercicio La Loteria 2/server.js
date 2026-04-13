import express from 'express';
const { fork } = require('child_process');

const app = express();
const PORT = 3001;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});


let registroTiradas = [];

app.get('/jugar/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const hijo = fork('./hijo.js', [nombre]);

    hijo.on('message', (mensaje) => {
        registroTiradas.push(mensaje.texto);
        
        console.log(`[${nombre}]: ${mensaje.texto}`);
        
        if (mensaje.finalizado) {
            res.json({
                jugador: nombre,
                historial: registroTiradas
            });
        }
    });

    hijo.on('error', (err) => {
        console.error("Error en el proceso hijo:", err);
        res.status(500).send("Hubo un error procesando el juego.");
    });
});

app.get('/estado', (req, res) => {
    res.json(JSON.parse({ servidor: "vivo" }));
})