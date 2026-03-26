// 1. Escuchamos el mensaje de la ventana hija SIEMPRE
window.addEventListener("message", function (event) {
    if (event.data === "ventana_cerrada") {
        console.log("Recibido aviso de cierre, actualizando estilos...");
        changeConfig();
    }
});

function showConfigModal() {
    // Para pruebas, puedes descomentar la siguiente línea para forzar el popup:
    // localStorage.removeItem("visited");

    const visited = localStorage.getItem("visited");

    if (!visited) {
        // Abrimos ventana de configuración
        window.open('./popUP.html', 'Config', 'width=600,height=400');
    } else {
        // Si ya ha visitado, aplicamos colores directamente
        changeConfig();
    }
}

function changeConfig() {
    // Recuperamos los valores directamente por su clave
    const backgroundColor = localStorage.getItem("background-color");
    const fontColor = localStorage.getItem("font-color");

    if (backgroundColor) {
        document.body.style.backgroundColor = backgroundColor;
    }
    if (fontColor) {
        document.body.style.color = fontColor;
    }
}

// Ejecutamos al cargar la página
showConfigModal();