crearCajas();
boton = document.getElementById("boton");
boton.addEventListener("click", function(){
    notas=localStorage.getItem("notas");
    if(notas==null){
        //No hay nada
        array=[];
    }else{
        array=JSON.parse(notas);
    }

    areatexto=document.getElementById("texto");
    array.push(areatexto.value);
    localStorage.setItem("notas", JSON.stringify(array));
    console.log(array);
    crearCajas();
});


function crearCajas(){
    notas=localStorage.getItem("notas");
    if(notas==null){
        //No hay nada
        array=[];
    }else{
        array=JSON.parse(notas);
    }


    codigohtml="",
    array.forEach((element,i) => {
        codigohtml = codigohtml +
        `<div> 
            <h2>NOTA #${i} </h2>
            <p> ${element} </p> 
            <button id=${i} onclick="eliminar(this.id)">Eliminar</button>
        </div>`;
    });

    cajaNotas = document.getElementById("notas");
    cajaNotas.innerHTML = codigohtml;
}

function eliminar(id) {
    let notas = localStorage.getItem("notas");
    if (notas === null) {
        return; // No hay notas para eliminar
    }
    let array = JSON.parse(notas);
    array.splice(id, 1);
    localStorage.setItem("notas", JSON.stringify(array));
    crearCajas();
}
