var listaMenu;
window.onload = function () {
    CargarConfiguracion();
    /*ConfigurarBotones();
    var dataOpciones = window.localStorage.getItem("Opciones");
    if (dataOpciones != "") {
        Http.get("Sistema/ListarMenus/?idAplicacion=" + 1, mostrarMenus);
    } else {
        var servicio = "opciones";
        Http.get("Sistema/Listar/?tabla=" + servicio + "&param=", mostrarOpciones);
    }*/
}
function CargarConfiguracion()
{
    
}

function ConfigurarBotones() {
    document.getElementById("btnAceptar").onclick = function () {
        var valido = validarDatos("C", "N", spnValidaPT);
        if (valido) {
            var servicio = "validarpuestotrabajo";
            var idpuestotrabajo = document.getElementById("cbopuestotrabajo").value;
            var usuario = window.localStorage.getItem("Usuario").split('|')[0];
            Http.get("Sistema/Listar/?tabla=" + servicio + "&param=" + idpuestotrabajo + '¬' + usuario, mostrarValidacion);
        }
    }

    var clicsalir = document.getElementsByClassName("salir");
    for (var i = 0; i < clicsalir.length; i++) {
        clicsalir[i].onclick = function () {
            var url = window.location.href;
            var simpleurl = url.split('/');
            window.location.href = simpleurl[0] + "//" + simpleurl[2];
           
        }
    }
}

function mostrarValidacion(rpta) {
    /*if (rpta != "") {
        var data = rpta.split('~');
        mostrarMenus(data[6]);
        window.localStorage.setItem("Ubigeo", data[0]);
        window.localStorage.setItem("Usuario", data[1]);
        ModalOpcionesAcceso.style.display = "none";

    } else {
        alert('No tiene acceso al modulo principal, consulte con soporte u/o administración...');
    }*/
}
function navegar(url) {
    var ifrPagina = document.getElementById("ifrPagina");
    if (ifrPagina != null)
       ifrPagina.src = url;
}
var linkColor = document.querySelectorAll('.nav__link');
function colorLink() {
    if (linkColor) {
        for (var i = 0; i < linkColor.length; i++) {
            linkColor[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("active");
                if (current.length > 0) {
                    current[0].className = current[0].className.replace(" active", "");
                }
                this.className += " active";
            });
        }
    }
}
linkColor.forEach(function (item) {
    item.addEventListener('click', function () {
        colorLink();
    });
});





