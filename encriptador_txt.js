const d = document;
const textArea = d.querySelector(".textarea_txt");
const imagenMuneco = d.querySelector(".imagen-muñeco");
const loader = d.querySelector(".loader");
const subtitulo = d.querySelector(".subtitulo");
const parrafo = d.querySelector(".parrafo");
const botonEncriptar = d.querySelector(".btn-Encriptar");
const botonDesencriptar = d.querySelector(".btn-Desencriptar");
const botonCopiar = d.querySelector(".boton_copiar_resultado");


const llaves = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufa"]];


//La letra "e" es convertida para "enter"
//La letra "i" es convertida para "imes"
//La letra "a" es convertida para "ai"
//La letra "o" es convertida para "ober"
//La letra "u" es convertida para "ufat"

// funcion encriptar

function encriptarmensaje(mensaje){
    let mensajeEncriptado = "";
    for(let i = 0; i < mensaje.length; i++){
        let letra = mensaje[i];
        let encriptada = letra;
        for(let j = 0; j < llaves.length; j++){
            if(letra === llaves[j][0]){
                encriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;

}

// funcion desencriptar

function desencriptarMensaje(mensaje){
    let mensajeDesencriptado = mensaje;
    for(let i = 0; i < llaves.length; i++){
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}
// Elementos  Dinamicos ocultar
textArea.addEventListener("input", (e) =>{
    imagenMuneco.style.display = "none";
    console.log(e.target.value);
    loader.classList.remove("hidden");
    subtitulo.textContent = "Esperando mensaje";
    parrafo.textContent = "";
    
});

//funciones del boton encriptar
botonEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarmensaje(mensaje);
    parrafo.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    subtitulo.textContent = "El mensaje Encriptado es:";
    loader.classList.add("hidden");
});

botonDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    parrafo.textContent= mensajeDesencriptado;
    loader.classList.add("hidden");
    subtitulo.textContent ="El mensaje desencriptado es:";
    botonCopiar.classList.remove("hidden");

});
botonCopiar.addEventListener("click", (e) => {
    let textocopiado = parrafo.textContent;
    navigator.clipboard.writeText(textocopiado).then(()=>{
        imagenMuneco.style.display = "block";
        loader.classList.add("hidden");
        subtitulo.textContent="Texto copiado con exito";
        botonCopiar.classList.add("hidden")
        parrafo.textContent = "";
    })
});