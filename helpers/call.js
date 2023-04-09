const loadPhone = ()=>{
    if(localStorage.getItem("emergency")){
        telefono.style.display = "none";
        customTel.innerHTML = "Contacto de confianza";
        customTel.classList.replace("btnAgregar", "btnLlamar")
    }
}

function guardarNumero() {
    const telefono = document.getElementById("telefono");
    const customTel = document.getElementById("customTel");
    if(!localStorage.getItem("emergency"))
        localStorage.setItem("emergency", telefono.value);
    telefono.style.display = "none";
    customTel.innerHTML = "Contacto de confianza";
    customTel.classList.replace("btnAgregar", "btnLlamar")
}
function llamar() {
    const telefono = document.getElementById("telefono");
    const customTel = document.getElementById("customTel");
    if (customTel.classList.contains("btnLlamar"))
        window.location.href = "tel:" + localStorage.getItem("emergency");
}