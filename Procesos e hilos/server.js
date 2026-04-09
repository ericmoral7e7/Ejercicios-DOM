import express from 'express';

const app = express();
const PORT = 3001;

const server = app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}/`);
});

/***************************************
 ************ CHILD PROCESS ************
 ***************************************/
import { execFile } from 'child_process';

app.get('/jugar/:nombre', (req, res) => {
    
    execFile('node', ['tarea-pesada.js', JSON.stringify(req.params['nombre'])],
        (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: 'Falló el proceso' });
            }
            const datos = JSON.parse(stdout);
            res.json(datos); // → { resultado: 15 }
        }
    );
    // Mientras tanto, Node sigue atendiendo otras peticiones
});

app.get('/estado', (req, res) => {
    res.json(JSON.parse({ servidor: "vivo" }));
})