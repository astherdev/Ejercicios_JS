function calcular() {
    // variables para almacenar los datos
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    let operacion = document.getElementById("operacion").value;
    let resultado;

    // verificamos si los numeros fueron ingresados
    if (isNaN(num1) || isNaN(num2)) {
        document.getElementById("resultado").innerText = "Por favor, ingresa ambos números.";
        return;  //salimos si no hay numeros faltantes
    }

    // Realizamos la operacion
    switch (operacion) {
        case "+"://suma
            resultado = num1 + num2;
            break;
        case "-"://resta
            resultado = num1 - num2;
            break;
        case "*"://multiplicacion
            resultado = num1 * num2; 
            break;
        case "/"://division
            // Validar que no se divida por 0
            if (num2 === 0) {
                document.getElementById("resultado").innerText = "No se puede dividir por 0.";
                return;
            }
            resultado = num1 / num2;
            break;
        default:
            document.getElementById("resultado").innerText = "Operación no válida";
            return; // Salir de la funcion
    }

    // mostramos el resultado
    document.getElementById("resultado").innerText = "Resultado: " + resultado;
}
