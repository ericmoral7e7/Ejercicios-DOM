const inicio = Date.now();
while (Date.now() - inicio < 5000) { }  // bloquea SOLO este hilo

const nombre = JSON.parse(process.argv[2]);

const numero = Math.floor(Math.random() * 10) + 1;

let premio;
if (numero === 7) {
    premio = "¡Has ganado 1000€!";
} else {
    premio = "Lo siento, has perdido";
}

const resultado = {
    nombre: nombre,
    numero: numero,
    premio: premio
};

process.stdout.write(JSON.stringify(resultado))