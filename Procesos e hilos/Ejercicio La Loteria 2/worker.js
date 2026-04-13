import { workerData, parentPort } from 'worker_threads';

console.log("Worker activo\n");

// Simula tarea pesada: bucle de 5 segundos
const inicio = Date.now();
while (Date.now() - inicio < 5000) {}  // bloquea SOLO este hilo

const resultado = workerData.numeros.reduce((acc, n) => acc + n, 0);
parentPort.postMessage({ resultado });