import { workerData, parentPort } from 'worker_threads';

// Recibe los datos del hilo principal
const { nombre } = workerData;

// Hace la tarea pesada
setTimeout(() => {
    }, 2000);

// Devuelve el resultado al hilo principal
parentPort.postMessage({ resultado });

