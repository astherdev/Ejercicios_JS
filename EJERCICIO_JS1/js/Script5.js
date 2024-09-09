// Variables para medir el tiempo transcurrido entre frames
let time = new Date();
let deltaTime = 0;

// Verifica el estado de carga del documento y llama a Init en consecuencia
if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(Init, 1);
} else {
    document.addEventListener("DOMContentLoaded", Init); 
}

// Inicializa el juego
function Init() {
    time = new Date(); // Registra el tiempo actual
    Start(); // Llama a la función Start para configurar el juego
    Loop(); // Inicia el ciclo de actualización del juego
}

// Función de bucle de juego que se ejecuta continuamente
function Loop() {
    deltaTime = (new Date() - time) / 1000; // Calcula el tiempo transcurrido desde el último frame en segundos
    time = new Date(); // Actualiza el tiempo actual
    Update(); // Actualiza el estado del juego
    requestAnimationFrame(Loop); // Solicita el siguiente frame de animación
}

// Variables del juego
let sueloY = 22; // Posición vertical del suelo
let velY = 0; // Velocidad vertical del dinosaurio
let impulso = 900; // Fuerza de impulso para el salto
let gravedad = 2500; // Gravedad aplicada al dinosaurio

let dinoPosX = 42; // Posición horizontal del dinosaurio
let dinoPosY = sueloY; // Posición vertical inicial del dinosaurio

let sueloX = 0; // Posición horizontal del suelo
let velEscenario = 1280 / 3; // Velocidad de desplazamiento del escenario
let gameVel = 1; // Velocidad del juego
let score = 0; // Puntuación del jugador

let parado = false; // Bandera para verificar si el juego está parado
let saltando = false; // Bandera para verificar si el dinosaurio está saltando

// Variables para obstáculos y nubes
let tiempoHastaObstaculo = 2;
let tiempoObstaculoMin = 0.7;
let tiempoObstaculoMax = 1.8;
let obstaculoPosY = 16;
let obstaculos = [];

let tiempoHastaNube = 0.5;
let tiempoNubeMin = 0.7;
let tiempoNubeMax = 2.7;
let maxNubeY = 270;
let minNubeY = 100;
let nubes = [];
let velNube = 0.5;

// Elementos del DOM
let contenedor;
let dino;
let textoScore;
let suelo;
let gameOver;

// Inicializa los elementos del juego y configura el manejo de eventos
function Start() {
    gameOver = document.querySelector(".game-over");
    suelo = document.querySelector(".suelo");
    contenedor = document.querySelector(".contenedor");
    textoScore = document.querySelector(".score");
    dino = document.querySelector(".dino");
    document.addEventListener("keydown", HandleKeyDown);
}

// Actualiza el estado del juego en cada frame
function Update() {
    if (parado) return; // Si el juego está parado, no hace nada
    
    MoverDinosaurio(); // Mueve al dinosaurio
    MoverSuelo(); // Mueve el suelo
    DecidirCrearObstaculos(); // Decide si crear un nuevo obstáculo
    DecidirCrearNubes(); // Decide si crear una nueva nube
    MoverObstaculos(); // Mueve los obstáculos
    MoverNubes(); // Mueve las nubes
    DetectarColision(); // Detecta si hubo una colisión

    velY -= gravedad * deltaTime; // Aplica la gravedad al dinosaurio
}

// Maneja el evento de presionar una tecla
function HandleKeyDown(ev) {
    if (ev.keyCode == 32) { // Si se presiona la barra espaciadora
        Saltar(); // Llama a la función para hacer saltar al dinosaurio
    }
}

// Hace que el dinosaurio salte
function Saltar() {
    if (dinoPosY === sueloY) { // Solo puede saltar si está en el suelo
        saltando = true;
        velY = impulso; // Asigna la velocidad de impulso
        dino.classList.remove("dino-corriendo"); // Cambia el estado del dinosaurio
    }
}

// Mueve al dinosaurio basado en su velocidad y el tiempo transcurrido
function MoverDinosaurio() {
    dinoPosY += velY * deltaTime;
    if (dinoPosY < sueloY) {
        TocarSuelo(); // Si el dinosaurio está por debajo del suelo, toca el suelo
    }
    dino.style.bottom = dinoPosY + "px"; // Actualiza la posición vertical del dinosaurio
}

// Ajusta la posición del dinosaurio al tocar el suelo
function TocarSuelo() {
    dinoPosY = sueloY;
    velY = 0;
    if (saltando) {
        dino.classList.add("dino-corriendo"); // Cambia el estado del dinosaurio
    }
    saltando = false; // Resetea el estado de salto
}

// Mueve el suelo horizontalmente
function MoverSuelo() {
    sueloX += CalcularDesplazamiento(); // Actualiza la posición del suelo
    suelo.style.left = -(sueloX % contenedor.clientWidth) + "px"; // Ajusta el desplazamiento del suelo
}

// Calcula el desplazamiento basado en la velocidad del escenario
function CalcularDesplazamiento() {
    return velEscenario * deltaTime * gameVel;
}

// Maneja el estado de colisión cuando el dinosaurio choca con un obstáculo
function Estrellarse() {
    dino.classList.remove("dino-corriendo");
    dino.classList.add("dino-estrellado");
    parado = true; // Detiene el juego
}

// Decide si crear un nuevo obstáculo
function DecidirCrearObstaculos() {
    tiempoHastaObstaculo -= deltaTime;
    if (tiempoHastaObstaculo <= 0) {
        CrearObstaculo(); // Crea un nuevo obstáculo
    }
}

// Decide si crear una nueva nube
function DecidirCrearNubes() {
    tiempoHastaNube -= deltaTime;
    if (tiempoHastaNube <= 0) {
        CrearNube(); // Crea una nueva nube
    }
}

// Crea un nuevo obstáculo en el contenedor
function CrearObstaculo() {
    let obstaculo = document.createElement("div");
    contenedor.appendChild(obstaculo);
    obstaculo.classList.add("cactus");
    if (Math.random() > 0.5) obstaculo.classList.add("cactus2"); // Añade clase adicional al azar
    obstaculo.posX = contenedor.clientWidth; // Posición inicial del obstáculo
    obstaculo.style.left = contenedor.clientWidth + "px"; // Establece la posición horizontal

    obstaculos.push(obstaculo); // Agrega el obstáculo al array
    tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel; // Recalcula el tiempo hasta el siguiente obstáculo
}

// Crea una nueva nube en el contenedor
function CrearNube() {
    let nube = document.createElement("div");
    contenedor.appendChild(nube);
    nube.classList.add("nube");
    nube.posX = contenedor.clientWidth; // Posición inicial de la nube
    nube.style.left = contenedor.clientWidth + "px"; // Establece la posición horizontal
    nube.style.bottom = minNubeY + Math.random() * (maxNubeY - minNubeY) + "px"; // Establece la posición vertical

    nubes.push(nube); // Agrega la nube al array
    tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax - tiempoNubeMin) / gameVel; // Recalcula el tiempo hasta la siguiente nube
}

// Mueve los obstáculos en la pantalla
function MoverObstaculos() {
    for (let i = obstaculos.length - 1; i >= 0; i--) {
        if (obstaculos[i].posX < -obstaculos[i].clientWidth) {
            obstaculos[i].parentNode.removeChild(obstaculos[i]); // Elimina el obstáculo del DOM
            obstaculos.splice(i, 1); // Elimina el obstáculo del array
            GanarPuntos(); // Actualiza la puntuación
        } else {
            obstaculos[i].posX -= CalcularDesplazamiento(); // Mueve el obstáculo
            obstaculos[i].style.left = obstaculos[i].posX + "px"; // Actualiza la posición horizontal
        }
    }
}

// Mueve las nubes en la pantalla
function MoverNubes() {
    for (let i = nubes.length - 1; i >= 0; i--) {
        if (nubes[i].posX < -nubes[i].clientWidth) {
            nubes[i].parentNode.removeChild(nubes[i]); // Elimina la nube del DOM
            nubes.splice(i, 1); // Elimina la nube del array
        } else {
            nubes[i].posX -= CalcularDesplazamiento() * velNube; // Mueve la nube
            nubes[i].style.left = nubes[i].posX + "px"; // Actualiza la posición horizontal
        }
    }
}

// Actualiza la puntuación y la velocidad del juego
function GanarPuntos() {
    score++;
    textoScore.innerText = score; // Actualiza el texto de la puntuación
    if (score == 5) {
        gameVel = 1.5;
        contenedor.classList.add("mediodia"); // Cambia el fondo del contenedor a mediodía
    } else if (score == 10) {
        gameVel = 2;
        contenedor.classList.add("tarde"); // Cambia el fondo del contenedor a tarde
    } else if (score == 20) {
        gameVel = 3;
        contenedor.classList.add("noche"); // Cambia el fondo del contenedor a noche
    }
    suelo.style.animationDuration = (3 / gameVel) + "s"; // Ajusta la duración de la animación del suelo
}

// Muestra el mensaje de Game Over y detiene el juego
function GameOver() {
    Estrellarse(); // Cambia el estado del dinosaurio a estrellado
    gameOver.style.display = "block"; // Muestra el mensaje de Game Over
}

// Detecta colisiones entre el dinosaurio y los obstáculos
function DetectarColision() {
    for (let i = 0; i < obstaculos.length; i++) {
        if (obstaculos[i].posX > dinoPosX + dino.clientWidth) {
            // Si el obstáculo está completamente a la derecha del dinosaurio, no puede chocar con él
            break;
        } else {
            if (IsCollision(dino, obstaculos[i], 10, 30, 15, 20)) {
                GameOver(); // Si hay una colisión, termina el juego
            }
        }
    }
}

// Verifica si dos elementos se están colisionando
function IsCollision(a, b, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    let aRect = a.getBoundingClientRect(); // Obtiene el rectángulo de colisión del primer elemento
    let bRect = b.getBoundingClientRect(); // Obtiene el rectángulo de colisión del segundo elemento

    // Verifica si los rectángulos de colisión no se superponen
    return !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    );
}
