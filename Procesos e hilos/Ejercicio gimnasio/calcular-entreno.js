import { workerData, parentPort } from 'worker_threads';

// Recibe los datos del hilo principal
const { nombre, peso, altura } = workerData;

const start = Date.now();
while (Date.now() - start < 6000) {
    // bucle bloqueante intencional
}

let imc = peso / (altura * altura)
let calorias = 0
let plan = ""

if (imc < 18.5) {
    plan = "Volumen";
    calorias = 3000;
} else if (imc >= 18.5 && imc < 25) {
    plan = "Mantenimiento";
    calorias = 2500;
} else {
    plan = "Definición";
    calorias = 2000;
}

const resultado = {
    nombre: nombre,
    imc: imc,
    plan: plan,
    calorias: calorias
}

// Devuelve el resultado al hilo principal
parentPort.postMessage({ resultado });

