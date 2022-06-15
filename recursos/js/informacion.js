function presencial() {
    var checkBox = document.getElementById("presencial");

    var sede = document.getElementById("contenedorSede");
    var domicilio = document.getElementById("contenedorDomicilio");
    if (checkBox.checked == true){
        sede.style.display = "block";
        domicilio.style.display = "none";
    } else {
        sede.style.display = "none";
    }
}
var container = document.getElementById("contenedorHorario");

function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    for (c = 8; c <= 16; c++) {
      var celda = document.createElement("div");
      celda.innerText = c + "pm";
      container.appendChild(celda).className = "grid-item";
    }
}
makeRows(3, 3);

var listaMenu;
window.onload = function () {
    CargarBotones();
}
function CargarBotones() {
    document.getElementById("btnNext").onclick = function () {
        step2.style.display = "block";
    }
    document.getElementById("btnNext2").onclick = function () {
        step3.style.display = "block";
    }
    document.getElementById("btnNext3").onclick = function () {
        step4.style.display = "block";
    }
    document.getElementById("btnAtras3").onclick = function () {
        step4.style.display = "none";
    }
    document.getElementById("btnAtras2").onclick = function () {
        step3.style.display = "none";
    }
    document.getElementById("btnAtras").onclick = function () {
        step2.style.display = "none";
    }
}

function guardarCita()
{
    var idNombre = document.getElementById('doc').value;
    var numerodc = document.getElementById('numdoc').value;
   
    

    alert(idNombre + " " + numerodc);
}