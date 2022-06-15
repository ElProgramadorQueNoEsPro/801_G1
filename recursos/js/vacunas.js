var listaMenu;
window.onload = function () {
    CargarBotones();
}
function CargarBotones() {
    document.getElementById("btnNuevo").onclick = function () {
        myModal.style.display = "block";
    }
    document.getElementsByClassName("close")[0].onclick = function(){
    myModal.style.display = "none";
    }
    document.getElementsByClassName("close")[1].onclick = function(){
        modalpaciente.style.display = "none";
    }
    document.getElementsByClassName("close")[2].onclick = function(){
        modalpacienteEdit.style.display = "none";
    }
    document.getElementById("buscarPac").onclick= function(){
        modalpaciente.style.display ="block";
    }
    document.getElementById("NuevoPaciente").onclick=function(){
        modalpacienteEdit.style.display="block";
    }
    document.getElementById("btnCancelar").onclick = function () {
        myModal.style.display = "none";
    }
   document.getElementById("btnCancelarPac").onclick = function () {
    modalpacienteEdit.style.display = "none";
    }
}