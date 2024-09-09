// Función para cambiar el color del semáforo
function cambiarColor(color) {
    // Cambia el color del círculo con id 'rojo' a rojo si el parámetro 'color' es 'rojo', de lo contrario, lo pone en gris
    document.getElementById('rojo').style.backgroundColor = color === 'rojo' ? 'red' : 'grey';
    
    // Cambia el color del círculo con id 'amarillo' a amarillo si el parámetro 'color' es 'amarillo', de lo contrario, lo pone en gris
    document.getElementById('amarillo').style.backgroundColor = color === 'amarillo' ? 'yellow' : 'grey';
    
    // Cambia el color del círculo con id 'verde' a verde si el parámetro 'color' es 'verde', de lo contrario, lo pone en gris
    document.getElementById('verde').style.backgroundColor = color === 'verde' ? 'green' : 'grey';
}

// Función para iniciar el ciclo del semáforo
function iniciarSemaforo() {
    // Cambia el color a rojo inmediatamente (0 ms de retraso)
    setTimeout(() => cambiarColor('rojo'), 0);
    
    // Cambia el color a amarillo después de 3000 ms (3 segundos)
    setTimeout(() => cambiarColor('amarillo'), 3000);
    
    // Cambia el color a verde después de 6000 ms (6 segundos)
    setTimeout(() => cambiarColor('verde'), 6000);
    
    // Vuelve a iniciar el ciclo del semáforo después de 9000 ms (9 segundos)
    setTimeout(iniciarSemaforo, 9000);
}

// Inicia el ciclo del semáforo al cargar el script
iniciarSemaforo();
