function setCookie(nombre, valor, dias = 7) {
    const expires = new Date(Date.now() + dias * 864e5).toUTCString();
    document.cookie = `${nombre}=${valor}; expires=${expires}; path=/`;
}

function saveConfig() {
    let backgroundColor = document.getElementById("background-color").value
    let textColor = document.getElementById("font-color").value

    console.log(backgroundColor)
    console.log(textColor)

    setCookie("backgroundColor", backgroundColor)
    setCookie("textColor", textColor)

    // Avisamos a la ventana padre ANTES de cerrar
    if (window.opener) {
        window.opener.postMessage("config_actualizada", "*");
    }

    window.close();
}

document.getElementById("config-form").addEventListener("submit", function (event) {
    event.preventDefault();
    saveConfig();
});