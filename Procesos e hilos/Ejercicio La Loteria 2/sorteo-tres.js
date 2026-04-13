const nombre = process.argv[2];

let calculoInutil = 0;
// Bucle de varios millones de iteraciones
for (let i = 0; i < 50000000; i++) {
    calculoInutil += i;
}

const nombresTiradas = ["Primera", "Segunda", "Tercera"];
let victoria = false;

for (let i = 0; i < 3; i++) {

    // Generamos un número aleatorio del 1 al 10
    const resultado = Math.floor(Math.random() * 10) + 1;

    // Condición para ganar: sacar un 7
    if (resultado === 7) {
        victoria = true;
        process.send({
            texto: `${nombresTiradas[i]} tirada: El resultado ha sido ${resultado} y ha ganado. No seguimos tirando`,
            finalizado: false
        });
        // Rompemos el bucle porque ya ganó
        break;
    } else {
        process.send({
            texto: `${nombresTiradas[i]} tirada: El resultado ha sido ${resultado} y ha perdido`,
            finalizado: false
        });
    }
}

if (victoria) {
    process.send({
        texto: `Resultado → ${nombre} ha ganado`,
        finalizado: true
    });
} else {
    process.send({
        texto: `Resultado → ${nombre} ha Perdido`,
        finalizado: true
    });
}

process.exit();