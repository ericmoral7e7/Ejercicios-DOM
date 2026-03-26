function saveConfig() {
    const backgroundColor = document.getElementById("background-color").value;
    const fontColor = document.getElementById("font-color").value;

    //1. Guardar en LocalStorage (mucho más limpio que cookies)
    localStorage.setItem("background-color", backgroundColor);
    localStorage.setItem("font-color", fontColor);
    localStorage.setItem("visited", "true");

    // 2. Avisamos a la ventana que nos abrió (opener)
    if (window.opener) {
        window.opener.postMessage("ventana_cerrada", "*");
    }
    
    // 3. Cerramos el popup
    window.close();
}

document.getElementById("config-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitamos que el formulario refresque el popup
    saveConfig();
});