// Función para obtener el valor de una cookie
function getCookie(nombre) {
    return document.cookie
        .split('; ')
        .find(c => c.startsWith(nombre + '='))
        ?.split('=')[1]
        ?? null;
}

function changeConfig() {
    let background = document.getElementById("background")
    let title = document.getElementById("titulo")
    let text = document.getElementById("texto")

    const backColor = getCookie("backgroundColor")
    const textColor = getCookie("textColor")

    background.style.backgroundColor = backColor
    title.style.color = textColor
    text.style.color = textColor
}

// Escuchamos el mensaje de la ventana hija
window.addEventListener("message", function (event) {
    if (event.data === "config_actualizada") {
        changeConfig();
    }
});

function init() {
    const visited = getCookie("visited");
    if (!visited) {
        // Abrimos el popup
        window.open('popUP.html', 'Config', 'width=600,height=400');
    }
    // Aplicamos lo que ya haya (si existe)
    changeConfig();
}

// Ejecutamos al cargar
init();