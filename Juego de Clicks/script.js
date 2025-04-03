let tiempo = 30; // Tiempo en segundos
let clics = 0; // Número de clics
let intervalo; // Intervalo para actualizar el tiempo

// Función para actualizar el tiempo
function actualizarTiempo() {
    tiempo--;
    document.getElementById("segundos").innerHTML = tiempo;

    if (tiempo === 0) {
        clearInterval(intervalo);
        alert("¡Tiempo agotado! Tu puntuación es: " + clics + " clics");
    }
}

// Función para contar los clics
function contarClics() {
    clics++;
    document.getElementById("clics").innerHTML = clics;
}

// Inicializar el juego
document.getElementById("boton").addEventListener("click", contarClics);
intervalo = setInterval(actualizarTiempo, 1000);