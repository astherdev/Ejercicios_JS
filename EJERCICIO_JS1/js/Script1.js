// número de imagen
var contador = 1; 
// variable temporizador      
var temporizador;
// Variable para controlar si el temporizador       
var activo = false;     

// Función para rotar imagenes
function iniciar() {
    if (!activo) {  // inicia si no esta activo
        temporizador = setInterval(rotarImagenes, 3000);  // cambia la imagen x3 segundas
        activo = true;  // temporizador activo
    }
}

// funcion para parar
function detener() {
    clearInterval(temporizador);  // para el temporizador
    activo = false;  // temporizador inactivo
}

// Función que rota las imágenes
function rotarImagenes() {
    if (contador >= 10) {  // Si llega a la última imagen, vuelve a la primera
        contador = 0;
    }

    var img = document.getElementById('imgSlide');  // Obtiene la imagen por su ID
    img.src = './images/img' + ++contador + '.jpg';  // Cambia el `src` de la imagen
}
