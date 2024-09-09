// Genera un número entre el 1 y 100
let numeroSecreto = Math.floor(Math.random() * 100) + 1;

// contador de intentos
let intentos = 0;

// Función que activa el adivinar el número
function adivinar() {
    // Obtiene el número ingresado por el usuario
    let intento = document.getElementById("numero").value;
    
    // incrementa intentos
    intentos++;
    
    // Compara el numero ingresado por el numero secreto
    if (intento == numeroSecreto) {
        // Si acierta muestra el texto
        document.getElementById("resultado").innerText = "¡Correcto! Adivinaste en " + intentos + " intentos.";
    } else if (intento < numeroSecreto) {
        // Si el intento es menor muestra un texto que el numero secreto es mayor
        document.getElementById("resultado").innerText = "El número es mayor. Inténtalo de nuevo.";
    } else {
        // Si el intento es mayor muestra un texto que el numero secreto es menor
        document.getElementById("resultado").innerText = "El número es menor. Inténtalo de nuevo.";
    }
}
