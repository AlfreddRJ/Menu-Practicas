let gameRunning = false;
let intervaloMostrarImg = 2000;
let puntos;
let startTime;

function startGame (){
    document.querySelector('.start-screen').style.display  = 'none';
    document.querySelector('.game-over-screen').style.display = 'none';

    gameRunning = true;
    intervaloMostrarImg=2000;
    puntos=0;
    startTime=Date.now();
    
    document.getElementById('puntos').textContent=puntos;
    document.getElementById('tiempo').textContent=0;

    mostrarImg();
    mostrarBonusImage();
    updateTime();

}

function mostrarImg (){
    if(!gameRunning) return;

    const img = document.createElement('img');
    img.src='img/angry.gif';
    img.classList.add('image');

    img.style.top = Math.random() * (window.innerHeight - 240) + 'px';
    img.style.left = Math.random() * (window.innerWidth - 130) + 'px';

    img.onclick = () =>{
        img.remove();
        puntos++;
        document.getElementById('puntos').textContent=puntos;
    }

    document.body.appendChild(img);

    if(document.querySelectorAll('.image').length>20){
        endGame();
        return;
    }

    intervaloMostrarImg *= 0.70;

    setTimeout(mostrarImg,intervaloMostrarImg);


}

function mostrarBonusImage () {
    if(!gameRunning) return;

    setTimeout(()=>{
        if(!gameRunning) return;

        const imgBonus = document.createElement('img');
        imgBonus.src='img/sun.gif';
        imgBonus.classList.add('bonus-image');

        imgBonus.style.top = Math.random() * (window.innerHeight - 240) + 'px';
        imgBonus.style.left = Math.random() * (window.innerWidth - 130) + 'px';

        imgBonus.onclick = () => {
            document.querySelectorAll('.image').forEach(img => img.remove());
            imgBonus.remove();
            puntos+=5;
            document.getElementById('puntos').textContent=puntos;
        }

        document.body.appendChild(imgBonus);

        setTimeout(()=>imgBonus.remove(),5000);

        mostrarBonusImage()

    }, 4000*Math.random() + 6000)


}

function updateTime(){
    if(!gameRunning) return;
    
    document.getElementById('tiempo').textContent = Math.floor((Date.now()-startTime)/1000);

    setTimeout(updateTime,1000)
}

function endGame () {
    gameRunning = false;

    document.querySelectorAll('.image, .bonus-image').forEach(img=>img.remove());

    document.querySelector('.game-over-screen').style.display='flex';

    document.getElementById('tiempoFinal').textContent = document.getElementById('tiempo').textContent
    document.getElementById('puntajeFinal').textContent = puntos;

}



function restartGame(){
    location.reload()
}