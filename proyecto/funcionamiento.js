// Variables globales para controlar el estado del juego
let gameRunning = false; 
let intervaloMostrarImg = 2000; // Intervalo inicial en milisegundos
let puntos;
let startTime; // Momento en que inicia el juego

function startGame() {
    // Oculta las pantallas de inicio y de game over
    document.querySelector('.start-screen').style.display = 'none';
    document.querySelector('.game-over-screen').style.display = 'none';
    
    gameRunning = true; 
    intervaloMostrarImg = 2000;
    puntos = 0; 
    startTime = Date.now();  // Guarda el tiempo de inicio del juego

    // Actualiza el puntaje y el tiempo mostrado en pantalla
    document.getElementById('puntos').textContent = puntos;
    document.getElementById('tiempo').textContent = 0;

    //Se mandan a llamar a la sfunciones
    mostrarImages();
    mostrarBonusImage(); 
    updateTime();
}

function mostrarImages() {
    if (!gameRunning) return; // Si el juego terminó, detiene la generación de imágenes
    
    // Crea una nueva imagen aleatoria que aparecerá en la pantalla
    const img = document.createElement('img');
    img.src = 'img/angry.gif'; 
    img.classList.add('image'); 

    // Establece coordenadas aleatorias dentro de los límites de la pantalla
    img.style.top = Math.random() * (window.innerHeight - 240) + 'px';
    img.style.left = Math.random() * (window.innerWidth - 130) + 'px';

    // Evento para eliminar la imagen cuando se haga clic en ella
    img.onclick = () => {
        img.remove();
        puntos++;    
        document.getElementById('puntos').textContent = puntos;
    };
    
    document.body.appendChild(img); // Agrega la imagen al cuerpo del documento
    
    // Si hay más de 20 imágenes en la pantalla, se finaliza el juego
    if (document.querySelectorAll('.image').length > 20) {
        endGame();
        return;
    }

    // Reduce el intervalo de aparición de imágenes en un 3% cada vez
    intervaloMostrarImg *= 0.97;
    
    // Vuelve a llamar a la función después de un tiempo determinado
    setTimeout(mostrarImages, intervaloMostrarImg);
}

function mostrarBonusImage() {
    if (!gameRunning) return; // Si el juego terminó, no genera más imágenes de bonificación
    
    setTimeout(() => {
        if (!gameRunning) return;

        // Crea la imagen de bonificación
        const bonusImg = document.createElement('img');
        bonusImg.src = 'img/sun.gif';
        bonusImg.classList.add('bonus-image');

        // Posición aleatoria en la pantalla
        bonusImg.style.top = Math.random() * (window.innerHeight - 230) + 'px';
        bonusImg.style.left = Math.random() * (window.innerWidth - 130) + 'px';

        // Evento para eliminar todas las imágenes al hacer clic y sumar 5 puntos
        bonusImg.onclick = () => {
            document.querySelectorAll('.image').forEach(img => img.remove());
            bonusImg.remove(); // Elimina la imagen de bonificación
            puntos += 5; 
            document.getElementById('puntos').textContent = puntos;
        };
        
        document.body.appendChild(bonusImg); 
        
        // Elimina la imagen de bonificación después de 5 segundos si no se ha tocado
        setTimeout(() => bonusImg.remove(), 5000);

        // Llama de nuevo a la función para generar otra imagen de bonificación después de un intervalo aleatorio
        mostrarBonusImage();  
    }, Math.random() * 10000 + 9000); // Intervalo aleatorio entre 9 y 19 segundos
}

function updateTime() {
    if (!gameRunning) return; // Si el juego terminó, detiene la actualización del tiempo
    
    // Calcula y actualiza el tiempo transcurrido desde el inicio del juego
    document.getElementById('tiempo').textContent = Math.floor((Date.now() - startTime) / 1000);
    
    // Llama a la función nuevamente después de 1 segundo
    setTimeout(updateTime, 1000);
}

function endGame() {
    gameRunning = false; // Detiene el juego
    
    // Elimina todas las imágenes activas de la pantalla
    document.querySelectorAll('.image, .bonus-image').forEach(img => img.remove());
    
    // Muestra la pantalla de Game Over
    document.querySelector('.game-over-screen').style.display = 'flex';
    
    // Muestra el tiempo final y el puntaje alcanzado
    document.getElementById('tiempoFinal').textContent = document.getElementById('tiempo').textContent;
    document.getElementById('puntajeFinal').textContent = puntos;
}

function restartGame() {
    location.reload(); // Recarga la página para reiniciar el juego
}
