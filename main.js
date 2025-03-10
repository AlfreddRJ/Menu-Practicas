cajaPrincipal=document.getElementById("rating");
for(let i=1; i<=10;i++){
    imagen = document.createElement("img");
    imagen.src="img/estrella_vacia.png";
    cajaPrincipal.appendChild(imagen);
    imagen.classList.add("item");
    imagen.setAttribute("pos", i);
    imagen.id="item-"+i;
    imagen.addEventListener("mouseover", 
        function(){
            let posicion=parseInt(this.getAttribute("pos"));
            for(let j=1; j<=10;j++){
                nuevo=document.getElementById("item-"+j);
                if(j<=posicion){
                    nuevo.src="img/estrella_rellena.png";

                }else{
                    nuevo.src="img/estrella_vacia.png";

                }
                
            }


    });


    
}