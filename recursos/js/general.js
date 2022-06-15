var Http = (function () {
    function Http() {
    }
    Http.get = function (url, callBack) {
        requestServer(url, "get", callBack);
    }

    Http.post = function (url, callBack, data) {
        requestServer(url, "post", callBack, data);
    }


    Http.postDownload = function (url, callBack, data) {
        requestServer(url, "post", callBack, data, "arraybuffer");
    }

    Http.postDownloadBytes = function (url, callBack, data) {
        requestServer(url, "post", callBack, data, null,"arraybuffer");
    }

    function requestServer(url, metodoHttp, metodoCallBack, data, sinUrlBase, tipoRpta) {
        //var urlBase = window.sessionStorage.getItem("urlBase");
        var urlBase = "/";
        var token = window.sessionStorage.getItem("token");

        var xhr = new XMLHttpRequest();
        if (sinUrlBase != null && sinUrlBase != "")
            xhr.open(metodoHttp, url);
        else
            xhr.open(metodoHttp, urlBase + url);


        if (token != null)
            xhr.setRequestHeader("token", token);

        if (tipoRpta != null && tipoRpta != "")
            xhr.responseType = tipoRpta;

        var divEspera = document.getElementById("divEspera");
        if (divEspera != null)
            divEspera.style.display = "inline"; xhr.onreadystatechange = function () {
                if (xhr.status == 200 && xhr.readyState == 4) {

                    if (divEspera != null)
                        divEspera.style.display = "none";

                    if (tipoRpta == null)
                        metodoCallBack(xhr.response);
                    else {
                        if (tipoRpta == "text")
                            metodoCallBack(xhr.response);
                        else
                            metodoCallBack(xhr.response);
                            //metodoCallBack(xhr.responseText);
                    }
                }
            }
        if (metodoHttp == "get")
            xhr.send();
        else {
            if (data != null && data != "")
                xhr.send(data);
        }
    }
    return Http;

})();
window.Http = Http;

function guardarConfiguracion() {
    window.sessionStorage.setItem("urlBase", hdfRaiz.value);
    window.sessionStorage.setItem("token", hdfToken.value);
}

//---- MANTENIMIENTO ---//
function Grilla(div, lista, listaAyuda, idGrilla, nombreTabla, controlador, registrosPagina, paginasBloque, tieneExportar, tieneImprimir, tieneEditar, tieneEliminar, verPdf, verXml, verCdr, sendCorreo, verEstado,editarOrden) {

    if (registrosPagina == null) registrosPagina = 20;
    if (paginasBloque == null) paginasBloque = 10;
    if (tieneExportar == null) tieneExportar = true;
    if (tieneImprimir == null) tieneImprimir = true;
    if (tieneEditar == null) tieneEditar = true;
    if (tieneEliminar == null) tieneEliminar = true;
    if (verPdf == null) verPdf = true;
    if (verXml == null) verXml = true;
    if (verCdr == null) verCdr = true;
    if (sendCorreo == null) sendCorreo = true;
    if (verEstado == null) verEstado = true;
    if (editarOrden == null) editarOrden = true;
    
    var matriz = []; //Registros filtrados y ordenados como array de arrays

    var valores = [];
    var ordenColumna = 0;
    var ordenTipo = 0;

    var indicePagina = 0;
    var indiceBloque = 0;
    var archivo = "";

    var ca = 0;
    var extension;

    iniciarGrilla();

    function iniciarGrilla() {
        crearTabla();
        filtrarMatriz();
    }

    function crearTabla() {
        var html = "";
        html += "<div class='ocultar'>";
        html += "<input id='";
        html += idGrilla;
        html += "btnLimpiarFiltros' type='button' class='Boton' value='Limpiar Filtros'/>";
        if (tieneExportar) {
            html += "<input id='";
            html += idGrilla;
            html += "btnExportarTxt' type='button' class='Boton' value='Exportar Txt' />";
            html += "<input id='";
            html += idGrilla;
            html += "btnExportarCsv' type='button' class='Boton' value='Exportar Csv' />";
            html += "<input id='";
            html += idGrilla;
            html += "btnExportarXlsx' type='button' class='Boton' value='Exportar Xlsx' />";
            html += "<input id='";
            html += idGrilla;
            html += "btnExportarDocx' type='button' class='Boton' value='Exportar Docx' />";
            html += "<input id='";
            html += idGrilla;
            html += "btnExportarPdf' type='button' class='Boton' value='Exportar Pdf' />";
            html += "<input id='";
            html += idGrilla;
            html += "btnExportarZip' type='button' class='Boton' value='Exportar ZIP' />";
        }
        if (tieneImprimir) {
            html += "<input id='";
            html += idGrilla;
            html += "btnImprimir' type='button' class='Boton' value='Imprimir' />";
        }
        html += "</div>";
        html += "<div class='Mensaje'>Registros Encontrados: <span id='";
        html += idGrilla;
        html += "spnTotal'></span></div>";
        html += "<table class='table table-striped'>";
        var cabeceras = lista[0].split("|");
        var anchos = lista[1].split("|");
        var ncampos = cabeceras.length;
        html += "<thead>";
        html += "<tr class='FilaCabecera'>";
        html += "<th style='width:30px'>";
        html += "<input type='checkbox' class='selcheckbox' />";
        html += "</th>";
        var cc = 1;
        for (var j = 0; j < ncampos; j++) {
            html += "<th style='width:";
            html += anchos[j];
            html += "px'>";
            if (listaAyuda != null && listaAyuda.IndicesCombosChecks.length > 0 && listaAyuda.IndicesCombosChecks.indexOf(j) > -1) {
                html += "<input type='checkbox' checked id='";
                html += idGrilla;
                html += "cabchk";
                html += cc;
                html += "' class='cabchk ";
                html += idGrilla;
                html += "' /> ";
                cc++;
            }
            html += "<span class='Enlace ";
            html += idGrilla;
            html += "' id='spn";
            html += j;
            html += "'>";
            html += cabeceras[j];
            html += "</span>&nbsp;";
            html += "<span class='Simbolo ";
            html += idGrilla;
            html += "'>";
            html += "</span>";
            html += "<br/>";
            if (listaAyuda != null && listaAyuda.IndicesCombos.length > 0 && listaAyuda.IndicesCombos.indexOf(j) > -1) {
                html += "<select style='width:90%' class='Cab Combo ";
                html += idGrilla;
                html += "'></select>";
            }
            else {
                if (listaAyuda != null && listaAyuda.IndicesCombosChecks.length > 0 && listaAyuda.IndicesCombosChecks.indexOf(j) > -1) {
                    html += "<div style='width:90%' class='Cab ComboCheck ";
                    html += idGrilla;
                    html += "'></div>";
                }
                else {
                    html += "<input type='text' style='width:90%' class='Cab Texto ";
                    html += idGrilla;
                    html += "'/>";
                }
            }
            html += "</th>";
        }
        if (tieneEditar) {
            html += "<th style='width:30px'>Edit</th>";
        }
        if (tieneEliminar) {
            html += "<th style='width:30px'>Elim</th>";
        }
        if (verPdf) {
            html += "<th style='width:30px'>Mostrar Pdf</th>";
        }
        if (verXml) {
            html += "<th style='width:30px'>Pdf sin Logo</th>";
        }
        if (verCdr) {
            html += "<th style='width:30px'>Cdr</th>";
        }
        if (sendCorreo) {
            html += "<th style='width:30px'>Correo</th>";
        }
        if (verEstado) {
            html += "<th style='width:30px'>Estado</th>";
        }
        if (editarOrden) {
            html += "<th style='width:30px'>Editar O.</th>";
        }
        
        html += "</tr>";
        html += "</thead>";
        html += "<tbody id='";
        html += idGrilla;
        html += "tbData'>";
        html += "</tbody>";
        html += "<tfoot>";
        html += "<tr>";
        html += "<td id='";
        html += idGrilla;
        html += "tdPagina' colspan='";
        var n = 1;
        if (tieneEditar) n++;
        if (tieneEliminar) n++;
        html += (ncampos + n);
        html += "' class='Centro'></td>";
        html += "</tr>";
        html += "</tfoot>";
        html += "</table>";
        div.innerHTML = html;
        configurarTextos();
        configurarCombos();
        configurarCombosChecks();
        configurarOrden();
        configurarBotones();
        var ComboCheck = document.getElementsByClassName("cabchk " + idGrilla);
        for (var m = 0; m < ComboCheck.length; m++) {
            ComboCheck[m].onclick = function () {
                seleccionarTodosChecks(this);
            }
        }
    }

    function filtrarMatriz() {
        indicePagina = 0;
        indiceBloque = 0;
        crearMatriz();
        mostrarMatriz();
    }

    function crearMatriz() {
        matriz = [];
        var nregistros = lista.length;
        var campos = [];
        var cabeceras = document.getElementsByClassName("Cab " + idGrilla);
        var ncabeceras = cabeceras.length;
        var exito;
        valores = [];
        var cc = 1;
        for (var j = 0; j < ncabeceras; j++) {
            if (cabeceras[j].className.indexOf("Texto") > -1) valores.push(cabeceras[j].value.toLowerCase());
            else {
                if (cabeceras[j].className.indexOf("ComboCheck") > -1) {
                    valores.push(obtenerChecksLista(idGrilla + "chk" + cc.toString()));
                    cc++;
                }
                else valores.push(cabeceras[j].options[cabeceras[j].selectedIndex].text);
            }
        }
        var fila = [];
        for (var i = 3; i < nregistros; i++) {
            campos = lista[i].split("|");
            ncampos = campos.length;
            for (var j = 0; j < ncabeceras; j++) {
                if (cabeceras[j].className.indexOf("Texto") > -1) exito = (valores[j] == "" || campos[j].toLowerCase().indexOf(valores[j]) > -1);
                else {
                    if (cabeceras[j].className.indexOf("ComboCheck") > -1) {
                        exito = (valores[j].indexOf(campos[j]) > -1);
                    }
                    else {
                        exito = (valores[j] == "Todos" || campos[j] == valores[j]);
                    }
                }
                if (!exito) break;
            }
            if (exito) {
                fila = [];
                for (var j = 0; j < ncampos; j++) {
                    if (isNaN(campos[j])) fila.push(campos[j]);
                    else fila.push(+campos[j]);
                }
                matriz.push(fila);
            }
        }
    }

    function mostrarMatriz() {
        var html = "";
        var nregistros = matriz.length;
        var cabeceras = document.getElementsByClassName("Cab " + idGrilla);
        var ncabeceras = cabeceras.length;
        var inicio = indicePagina * registrosPagina;
        var fin = inicio + registrosPagina;

        for (var i = inicio; i < fin; i++) {
                if (i < nregistros) {
                    html += "<tr class='FilaDatos ";
                    html += idGrilla;
                    html += "'>";
                    html += "<td>";
                    //html += "<input type='checkbox' onclick='seleccionarFila(this);'/>";
                    html += "<input type='checkbox' class='selcheckbox' />";
                    html += "</td>";
                    for (var j = 0; j < ncabeceras; j++) {
                        html += "<td>";
                        if (cabeceras[j].className.indexOf("Texto") > -1) html += resaltarFiltro(valores[j], matriz[i][j]);
                        else html += matriz[i][j];
                        html += "</td>";
                    }
                    if (tieneEditar) {
                        html += "<td>";
                        html += "<img src='";
                        html += hdfRaiz.value;
                        html += "Recursos/Img/Editar.png' class='Icono Editar ";
                        html += idGrilla;
                        html += "'/>";
                        html += "</td>";
                    }
                    if (tieneEliminar) {
                        html += "<td>";
                        html += "<img src='";
                        html += hdfRaiz.value;
                        html += "Recursos/Img/Eliminar.png' class='Icono Eliminar ";
                        html += idGrilla;
                        html += "'/>";
                        html += "</td>";
                    }
                    if (verPdf) {

                        html += "<td>";
                        html += "<img src='";
                        html += "";
                        html += "../recursos/imagenes/icon_pdf.png' class='Icono Pdf ";
                        html += idGrilla;
                        html += "'/>";
                        html += "</td>";
                    }
                    if (verXml) {

                        html += "<td>";
                        html += "<img src='";
                        html += "/";
                        html += "../image/icon_pdf.png' class='Icono Xml ";
                        html += idGrilla;
                        html += "'/>";
                        html += "</td>";
                    }
                    if (verCdr) {

                        html += "<td>";
                        html += "<img src='";
                        html += hdfRaiz.value;
                        html += "Recursos/Img/cdr.png' class='Icono Cdr ";
                        html += idGrilla;
                        html += "'/>";
                        html += "</td>";
                    }
                    if (sendCorreo) {
                        html += "<td>";
                        html += "<img src='";
                        html += hdfRaiz.value;
                        html += "Recursos/Img/mail.png' class='Icono Correo ";
                        html += idGrilla;
                        html += "'/>";
                        html += "</td>";
                    }
                    if (verEstado) {

                        html += "<td>";
                        html += "<img src='";
                        html += hdfRaiz.value;
                        html += "Recursos/Img/check.png' class='Icono Estado ";
                        html += idGrilla;
                        html += "'/>";
                        html += "</td>";
                    }
                    if (editarOrden) {

                        html += "<td>";
                        html += "<img src='";
                        html += "/";
                        html += "../image/editar.png' class='Icono editarOrden ";
                        html += idGrilla;
                        html += "'/>";
                        html += "</td>";
                    }
                    html += "</tr>";
                }
                else break;
            }
       
        
        document.getElementById(idGrilla + "tbData").innerHTML = html;
        document.getElementById(idGrilla + "spnTotal").innerHTML = nregistros;
       
        crearPaginacion();
        configurarFilas();
        configurarIconos();
        var allcheck = div.getElementsByClassName("selcheckbox");
        for (var p = 0; p < allcheck.length; p++) {
            if (p == 0) {
                allcheck[p].onclick = function () {
                    seleccionarTodo(this);
                }
            }
            else {
                allcheck[p].onclick = function () {
                    seleccionarFila(this);
                }
            }
        }
    }

    function configurarIconos() {

        var iconosEditar = document.getElementsByClassName("Icono Editar " + idGrilla);
        var nIconosEditar = iconosEditar.length;
        for (var i = 0; i < nIconosEditar; i++) {
            iconosEditar[i].onclick = function () {
                editarRegistroGrilla(idGrilla, this);
            }
        }
        var iconosEliminar = document.getElementsByClassName("Icono Eliminar " + idGrilla);
        var nIconosEliminar = iconosEliminar.length;
        for (var i = 0; i < nIconosEliminar; i++) {
            iconosEliminar[i].onclick = function () {
                eliminarRegistroGrilla(idGrilla, this);
            }
        }
        var iconosPdf = document.getElementsByClassName("Icono Pdf " + idGrilla);
        var nIconosPdf = iconosPdf.length;
        for (var i = 0; i < nIconosPdf; i++) {
            iconosPdf[i].onclick = function () {
                VerPdfRegistroGrilla(idGrilla, this);
            }
        }
        var iconosXml = document.getElementsByClassName("Icono Xml " + idGrilla);
        var nIconosXml = iconosXml.length;
        for (var i = 0; i < nIconosXml; i++) {
            iconosXml[i].onclick = function () {
                VerXmlRegistroGrilla(idGrilla, this);
            }
        }
        var iconosCdr = document.getElementsByClassName("Icono Cdr " + idGrilla);
        var nIconosCdr = iconosCdr.length;
        for (var i = 0; i < nIconosCdr; i++) {
            iconosCdr[i].onclick = function () {
                VerCdrRegistroGrilla(idGrilla, this);
            }
        }
        var iconosCorreo = document.getElementsByClassName("Icono Correo " + idGrilla);
        var nIconosCorreo = iconosCorreo.length;
        for (var i = 0; i < nIconosCorreo; i++) {
            iconosCorreo[i].onclick = function () {
                VerSendCorreoRegistroGrilla(idGrilla, this);
            }
        }
        var iconosEstado = document.getElementsByClassName("Icono Estado " + idGrilla);
        var nIconosEstado = iconosEstado.length;
        for (var i = 0; i < nIconosEstado; i++) {
            iconosEstado[i].onclick = function () {
                VerEstadoRegistroGrilla(idGrilla, this);
            }
        }
        var iconosEditarOrden = document.getElementsByClassName("Icono editarOrden " + idGrilla);
        var niconosEditarOrden = iconosEditarOrden.length;
        for (var i = 0; i < niconosEditarOrden; i++) {
            iconosEditarOrden[i].onclick = function () {
                VerEditarOrden(idGrilla, this);
            }
        }
        

    }

    function configurarFilas() {
        var filas = document.getElementsByClassName("FilaDatos " + idGrilla);
        var nfilas = filas.length;
        for (var i = 0; i < nfilas; i++) {
            filas[i].ondblclick = function () {
                seleccionarFilaGrilla(idGrilla, this);
            }
        }
    }

    function crearPaginacion() {
        var html = "";
        var nregistros = matriz.length;
        var totalPaginas = Math.floor(nregistros / registrosPagina);
        if (nregistros % registrosPagina > 0) totalPaginas++;
        var registrosBloque = paginasBloque * registrosPagina;
        var totalBloques = Math.floor(nregistros / registrosBloque);
        if (nregistros % registrosBloque > 0) totalBloques++;
        var inicio = indiceBloque * paginasBloque;
        var fin = inicio + paginasBloque;
        if (nregistros > registrosPagina) {
            if (indiceBloque > 0) {
                html += "<input id='";
                html += idGrilla;
                html += "PaginaInicio' type='button' class='Pagina ";
                html += idGrilla;
                html += "' value=' << '/>";
                html += "<input id='";
                html += idGrilla;
                html += "PaginaAnterior' type='button' class='Pagina ";
                html += idGrilla;
                html += "' value=' < '/>";
            }
            for (var j = inicio; j < fin; j++) {
                if (j < totalPaginas) {
                    html += "<input type='button' class='";
                    html += (j == indicePagina ? "Pag PaginaSeleccionada " : "Pag Pagina ");
                    html += idGrilla;
                    html += "' value='";
                    html += (j + 1);
                    html += "'/>";
                }
                else break;
            }
            if (indiceBloque < (totalBloques - 1)) {
                html += "<input id='";
                html += idGrilla;
                html += "PaginaSiguiente' type = 'button' class='Pagina ";
                html += idGrilla;
                html += "' value=' > '/>";
                html += "<input id='";
                html += idGrilla;
                html += "PaginaUltima' type='button' class='Pagina ";
                html += idGrilla;
                html += "' value=' >> '/>";
            }
            html += "<select class='select' id='cboPagina";
            html += idGrilla;
            html += "'>";
            for (var j = 0; j < totalPaginas; j++) {
                html += "<option value='";
                html += (j);
                html += "'";
                if (j == indicePagina) html += " selected ";
                html += ">";
                html += (j + 1);
                html += "</option>";
            }
            html += "</select>";
        }
        document.getElementById(idGrilla + "tdPagina").innerHTML = html;
        configurarPaginacion();
    }

    function configurarPaginacion() {
        var btnPaginaInicio = document.getElementById(idGrilla + "PaginaInicio");
        if (btnPaginaInicio != null) {
            btnPaginaInicio.onclick = function () { paginar(-1); }
        }
        var btnPaginaAnterior = document.getElementById(idGrilla + "PaginaAnterior");
        if (btnPaginaAnterior != null) {
            btnPaginaAnterior.onclick = function () { paginar(-2); }
        }
        var btnPaginaSiguiente = document.getElementById(idGrilla + "PaginaSiguiente");
        if (btnPaginaSiguiente != null) {
            btnPaginaSiguiente.onclick = function () { paginar(-3); }
        }
        var btnPaginaUltima = document.getElementById(idGrilla + "PaginaUltima");
        if (btnPaginaUltima != null) {
            btnPaginaUltima.onclick = function () { paginar(-4); }
        }
        var btnPaginas = document.getElementsByClassName("Pag " + idGrilla);
        var nPaginas = btnPaginas.length;
        for (var j = 0; j < nPaginas; j++) {
            btnPaginas[j].onclick = function () { paginar(+this.value - 1); }
        }
        var cboPagina = document.getElementById("cboPagina" + idGrilla);
        if (cboPagina != null) {
            cboPagina.onchange = function () {
                paginar(this.value);
            }
        }
    }

    function paginarCombo(cbo) {
        paginar(cbo.value);
    }

    function paginar(indice) {
        if (indice > -1) {
            indicePagina = indice;
            indiceBloque = Math.floor(indice / paginasBloque);
        }
        else {
            var nregistros = matriz.length;
            var registrosBloque = paginasBloque * registrosPagina;
            var totalBloques = Math.floor(nregistros / registrosBloque);
            if (nregistros % registrosBloque > 0) totalBloques++;
            switch (indice) {
                case -1: //Ir al Primer Bloque
                    indiceBloque = 0;
                    indicePagina = 0;
                    break;
                case -2: //Retroceder al Bloque Anterior
                    indiceBloque--;
                    indicePagina = indiceBloque * paginasBloque;
                    break;
                case -3: //Avanzar al Siguiente Bloque
                    indiceBloque++;
                    indicePagina = indiceBloque * paginasBloque;
                    break;
                case -4: //Ir al Ultimo Bloque
                    indiceBloque = totalBloques - 1;
                    indicePagina = indiceBloque * paginasBloque;
                    break;
            }
        }
        mostrarMatriz();
    }

    function configurarTextos() {
        var textos = document.getElementsByClassName("Cab Texto " + idGrilla);
        var ntextos = textos.length;
        for (var j = 0; j < ntextos; j++) {
            textos[j].onkeyup = function (event) {
                filtrarMatriz();
            }
        }
    }

    function configurarCombos() {
        var combos = document.getElementsByClassName("Cab Combo " + idGrilla);
        var ncombos = combos.length;
        for (var j = 0; j < ncombos; j++) {
            crearCombo(listaAyuda.ListaCombos[j], combos[j], "Todos");
            combos[j].onchange = function () {
                filtrarMatriz();
            }
        }
    }

    function seleccionarTodo(chkCab) {
        var filas = document.getElementById(idGrilla + "tbData").rows;
        var nfilas = filas.length;
        for (var i = 0; i < nfilas; i++) {
            filas[i].className = (chkCab.checked ? "FilaSeleccionada" : "FilaDatos");
            filas[i].cells[0].firstChild.checked = chkCab.checked;
        }
    }

    //Funciones para los Combos con CheckBoxes
    function crearListaChecks(cbo, lista, idCheck) {
        var contenido = "<div id='";
        contenido += idCheck;
        contenido += "divCheck' class='selectBox' data-id='";
        contenido += idCheck;
        contenido += "'>";
        contenido += "<select>";
        contenido += "<option>Selecciona una o más opciones</option>";
        contenido += "</select>";
        contenido += "<div class='overSelect'></div>";
        contenido += "</div>";
        contenido += "<div id='";
        contenido += idCheck;
        contenido += "' class='checkbox'>";
        var nRegistros = lista.length;
        var campos;
        for (var i = 0; i < nRegistros; i++) {
            campos = lista[i].split("|");
            contenido += "<label for='";
            contenido += idCheck;
            contenido += campos[0];
            contenido += "' class='label'>";
            contenido += "<input type='checkbox' checked id='";
            contenido += idCheck;
            contenido += campos[0];
            contenido += "' />";
            contenido += campos[1];
            contenido += "</label>";
        }
        contenido += "</div>";
        cbo.innerHTML = contenido;
        var divCheck = document.getElementById(idCheck + "divCheck");
        if (divCheck != null) {
            divCheck.onclick = function () {
                showCheckboxes(this.getAttribute("data-id"));
            }
        }
    }

    function showCheckboxes(idCheck) {
        var divChecks = document.getElementById(idCheck);
        var estilo = divChecks.style.display;
        if (estilo == "" || estilo == "none") divChecks.style.display = "block";
        else divChecks.style.display = "none";
    }

    function obtenerChecksLista(idCheck) {
        var listaChecksFiltro = [];
        var listaChecksTodo = document.getElementById(idCheck).childNodes;
        var nListaCheks = listaChecksTodo.length;
        var label;
        var check;
        var texto;
        for (var i = 0; i < nListaCheks; i++) {
            label = listaChecksTodo[i];
            check = label.childNodes[0];
            texto = label.childNodes[1];
            valor = label.getAttribute("for");
            if (check.checked) {
                listaChecksFiltro.push(texto.textContent);
            }
        }
        return listaChecksFiltro;
    }

    function seleccionarChecksLista(idCheck, seleccionado) {
        var listaChecksTodo = document.getElementById(idCheck).childNodes;
        var nListaCheks = listaChecksTodo.length;
        var check;
        for (var i = 0; i < nListaCheks; i++) {
            check = listaChecksTodo[i].childNodes[0];
            check.checked = seleccionado;
        }
    }

    function seleccionarTodosChecks(chkCab) {
        var idCheck = idGrilla + chkCab.id.substring(idGrilla.length + 3, chkCab.id.length);
        seleccionarChecksLista(idCheck, chkCab.checked);
        filtrarMatriz();
    }

    function configurarCombosChecks() {
        var combos = document.getElementsByClassName("ComboCheck " + idGrilla);
        var ncombos = combos.length;
        var c = 0;
        for (var j = 0; j < ncombos; j++) {
            c++;
            crearListaChecks(combos[j], listaAyuda.ListaCombosChecks[j], idGrilla + "chk" + c);
            combos[j].onchange = function () {
                console.log("Filtrando");
                filtrarMatriz();
            }
        }
    }

    function seleccionarFila(check) {
        filaActual = check.parentNode.parentNode;
        if (check.checked) filaActual.className = "FilaSeleccionada";
        else filaActual.className = "FilaDatos";
    }

    function resaltarFiltro(valorFiltro, campoDatos) {
        var html = "";
        if (campoDatos != undefined) {
            campoDatos = campoDatos.toString();
            if (valorFiltro == "") html = campoDatos;
            else {
                var campoMin = campoDatos.toLowerCase();
                var c = valorFiltro.length;
                var n = campoDatos.length;
                pos = 0;
                posAnterior = 0;
                while (pos < n && pos > -1) {
                    pos = campoMin.indexOf(valorFiltro, pos);
                    if (pos > -1) {
                        html += campoDatos.substring(posAnterior, pos);
                        html += "<font color='red'>";
                        html += campoDatos.substr(pos, c);
                        html += "</font>";
                        posAnterior = pos + c;
                        pos = pos + c;
                    }
                }
                html += campoDatos.substring(posAnterior, n);
            }
        }
       
        
        return html;
    }

    function ordenar(x, y) {
        var valorX = x[ordenColumna];
        var valorY = y[ordenColumna];
        if (ordenTipo == 0) return (valorX > valorY ? 1 : -1);
        else return (valorX < valorY ? 1 : -1);
    }

    function configurarOrden() {
        var enlaces = document.getElementsByClassName("Enlace " + idGrilla);
        var nenlaces = enlaces.length;
        for (var j = 0; j < nenlaces; j++) {
            enlaces[j].onclick = function () {
                var spnSimbolo = this.nextSibling.nextSibling;
                var simbolo = spnSimbolo.innerHTML;
                borrarSimbolos();
                ordenColumna = +this.id.substring(3, this.id.length);
                if (simbolo == "" || simbolo == "▼") {
                    ordenTipo = 0;
                    spnSimbolo.innerHTML = "▲";
                }
                else {
                    ordenTipo = 1;
                    spnSimbolo.innerHTML = "▼";
                }
                if (simbolo == "") matriz.sort(ordenar);
                else matriz.reverse();
                mostrarMatriz();
            }
        }
    }

    function borrarSimbolos() {
        var simbolos = document.getElementsByClassName("Simbolo " + idGrilla);
        var nsimbolos = simbolos.length;
        for (var j = 0; j < nsimbolos; j++) {
            simbolos[j].innerHTML = "";
        }
    }

    function configurarBotones() {
        var btnLimpiarFiltros = document.getElementById(idGrilla + "btnLimpiarFiltros");
        if (btnLimpiarFiltros != null) {
            btnLimpiarFiltros.onclick = function () {
                var cabeceras = document.getElementsByClassName("Cab " + idGrilla);
                var ncabeceras = cabeceras.length;
                var chkCab;
                for (var j = 0; j < ncabeceras; j++) {
                    if (cabeceras[j].className.indexOf("ComboCheck") > -1) {
                        chkCab = cabeceras[j].parentNode.childNodes[0];
                        chkCab.checked = true;
                        seleccionarTodosChecks(chkCab);
                    }
                    else cabeceras[j].value = "";
                }
                filtrarMatriz();
            }
        }

        var btnExportarTxt = document.getElementById(idGrilla + "btnExportarTxt");
        if (btnExportarTxt != null) {
            btnExportarTxt.onclick = function () {
                var data = exportarTexto("|", "\r\n");
                descargarArchivo(data, nombreTabla + ".txt");
            }
        }

        var btnExportarCsv = document.getElementById(idGrilla + "btnExportarCsv");
        if (btnExportarCsv != null) {
            btnExportarCsv.onclick = function () {
                var data = exportarTexto(";", "\r\n");
                descargarArchivo(data, nombreTabla + ".csv");
            }
        }

        //Botones que llaman al servidor
        var btnExportarXlsx = document.getElementById(idGrilla + "btnExportarXlsx");
        if (btnExportarXlsx != null) {
            btnExportarXlsx.onclick = function () {
                archivo = nombreTabla + ".xlsx";
                extension = ".xlsx";
                enviarArchivo();
            }
        }

        var btnExportarDocx = document.getElementById(idGrilla + "btnExportarDocx");
        if (btnExportarDocx != null) {
            btnExportarDocx.onclick = function () {
                archivo = nombreTabla + ".docx";
                extension = ".docx";
                enviarArchivo();
            }
        }

        var btnExportarPdf = document.getElementById(idGrilla + "btnExportarPdf");
        if (btnExportarPdf != null) {
            btnExportarPdf.onclick = function () {
                archivo = nombreTabla + ".pdf";
                extension = ".pdf";
                enviarArchivo();
            }
        }

        var btnImprimir = document.getElementById(idGrilla + "btnImprimir");
        if (btnImprimir != null) {
            btnImprimir.onclick = function () {
                var data = exportarHtml();
                imprimir(data);
            }
        }
        var btnExportarZip = document.getElementById(idGrilla + "btnExportarZip");
        if (btnExportarZip != null) {
            btnExportarZip.onclick = function () {
                var data = exportarTexto("|", "¬");
                GenerarArchivos(data);
            }
        }
        
        //btnExportarZip
    }

    function enviarArchivo() {
        var data = exportarTexto("|", ";", true);
        var frm = new FormData();
        frm.append("data", data);
        Http.postDownloadBytes(controlador + "/exportar?nombreArchivo=" + archivo, mostrarRptaExportar, frm);
    }

    function mostrarRptaExportar(rpta) {
        if (rpta) {
            descargarArchivo(rpta, archivo);
        }
    }

    function exportarTexto(sepCampo, sepReg, conAnchos) {
        var data = "";
        var cabeceras = lista[0].split("|");
        var ncabeceras = cabeceras.length;
        for (var j = 0; j < ncabeceras; j++) {
            data += cabeceras[j];
            if (j < ncabeceras - 1) data += sepCampo;
        }
        data += sepReg;
        if (conAnchos) {
            var anchos = lista[1].split("|");
            for (var j = 0; j < ncabeceras; j++) {
                data += anchos[j];
                if (j < ncabeceras - 1) data += sepCampo;
            }
            data += sepReg;
            var tipos = lista[2].split("|");
            for (var j = 0; j < ncabeceras; j++) {
                data += tipos[j];
                if (j < ncabeceras - 1) data += sepCampo;
            }
            data += sepReg;
        }
        var nregistros = matriz.length;
        for (var i = 0; i < nregistros; i++) {
            for (var j = 0; j < ncabeceras; j++) {
                data += matriz[i][j];
                if (j < ncabeceras - 1) data += sepCampo;
            }
            if (i < nregistros - 1) data += sepReg;
        }
        return data;
    }

    function exportarHtml(conPiePagina) {
        var html = "";
        var nregistros = matriz.length;
        if (nregistros > 0) {
            html += "<table>";
            html += "<thead>";
            var cabeceras = lista[0].split("|");
            var anchos = lista[1].split("|");
            var ncabeceras = cabeceras.length;
            html += "<tr>";
            for (var j = 0; j < ncabeceras; j++) {
                html += "<th style='width:";
                html += anchos[j];
                html += "px;color:white;background-color:rgb(196, 3, 7)'>";
                html += cabeceras[j];
                html += "</th>";
            }
            html += "</tr>";
            html += "</thead>";
            html += "<tbody>";
            for (var i = 0; i < nregistros; i++) {
                html += "<tr>";
                for (var j = 0; j < ncabeceras; j++) {
                    html += "<td style='color:#363636;background-color:white;'>";
                    html += matriz[i][j];
                    html += "</td>";
                }
                html += "</tr>";
            }
            html += "</tbody>";
            if (conPiePagina) {
                html += "<tfoot>";
                html += "<tr>";
                html += "<td colspan='";
                html += ncabeceras - 1;
                html += "' style='color:white;background-color:rgb(196, 3, 7);text-align:right'>";
                html += "Total de Items";
                html += "</td>";
                html += "<td style='color:white;background-color:rgb(196, 3, 7);text-align:right'>";
                html += "=Count(A2:A";
                html += (nregistros + 1);
                html += ")";
                html += "</td>";
                html += "</tr>";
                html += "</tfoot>";
            }
            html += "</table>";
        }
        return html;
    }

    function descargarArchivo(data, archivo) {
        var mime = obtenerMIME(archivo);
        var blob = new Blob(mime == "text/csv" ? ["\ufeff", data] : [data], { "type": mime });
        var link = document.createElement("a");
        link.download = archivo;
        link.href = URL.createObjectURL(blob);
        link.click();
    }

    function obtenerMIME(archivo) {
        var mime = "application/octet-stream";
        var campos = archivo.toLowerCase().split(".");
        var extension = campos[campos.length - 1];
        switch (extension) {
            case "txt":
                mime = "text/plain";
                break;
            case "csv":
                mime = "text/csv";
                break;
            case "xls":
                mime = "application/vnd.ms-excel";
                break;
            case "xlsx":
                mime = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                break;
            case "docx":
                mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                break;
            case "pdf":
                mime = "application/pdf";
                break;
        }
        return mime;
    }

    function crearPdf(titulo) {
        var nfilas = matriz.length;
        var cabeceras = lista[0].split("|");
        var anchos = lista[1].split("|");
        var ncampos = cabeceras.length;
        var nhojas = nfilas / 20;
        if (nfilas % 20 > 0) nhojas++;
        var ancho;
        var anchoTotal = 0;
        var cr = 0;
        var sw = [];
        sw.push("%PDF-1.4\r\n");
        sw.push("1 0 obj <</Type /Catalog /Pages 2 0 R>>\r\n");
        sw.push("endobj\r\n");
        sw.push("2 0 obj <</Type /Pages /Kids [");
        for (var k = 0; k < nhojas; k++) {
            sw.push((k * 4) + 3);
            sw.push(" 0 R ");
        }
        sw.push("] /Count ");
        sw.push(nhojas);
        sw.push(">>\r\n");
        sw.push("endobj\r\n");
        for (var k = 0; k < nhojas; k++) {
            sw.push((k * 4) + 3);
            sw.push(" 0 obj <</Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 600 800] /Contents ");
            sw.push((k * 4) + 6);
            sw.push(" 0 R>>\r\n");
            sw.push("endobj\r\n");
            sw.push((k * 4) + 4);
            sw.push(" 0 obj <</Font <</F1 5 0 R>>>>\r\n");
            sw.push("endobj\r\n");
            sw.push((k * 4) + 5);
            sw.push(" 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>");
            sw.push("endobj\r\n");
            sw.push((k * 4) + 6);
            sw.push(" 0 obj\r\n");
            sw.push("<</Length 44>>\r\n");
            sw.push("stream\r\n");
            sw.push("BT");
            sw.push("/F1 16 Tf 50 750 Td 0 Tr 0.5 g (");
            sw.push(titulo);
            sw.push(")Tj ");
            sw.push("/F1 10 Tf 0 g ");
            sw.push("0 -30 Td (");
            sw.push(cabeceras[0]);
            sw.push(")Tj ");
            anchoTotal = 0;
            for (var j = 1; j < ncampos; j++) {
                ancho = (anchos[j - 1] * 1) / 2;
                sw.push(ancho);
                sw.push(" 0 Td (");
                sw.push(cabeceras[j]);
                sw.push(")Tj ");
                anchoTotal += ancho;
            }
            for (var i = 0; i < 20; i++) {
                if (cr < nfilas) {
                    sw.push("-");
                    sw.push(anchoTotal);
                    sw.push(" -30 Td (");
                    sw.push(matriz[cr][0].toString());
                    sw.push(")Tj ");
                    for (var j = 1; j < ncampos; j++) {
                        ancho = (anchos[j - 1] * 1) / 2;
                        sw.push(ancho);
                        sw.push(" 0 Td (");
                        sw.push(matriz[cr][j].toString());
                        sw.push(")Tj ");
                    }
                    cr++;
                }
                else break;
            }
            sw.push("ET\r\n");
            sw.push("endstream\r\n");
            sw.push("endobj\r\n");
        }
        sw.push("xref\r\n");
        sw.push("0 7\r\n");
        sw.push("0000000000 65535 f\r\n");
        sw.push("0000000009 00000 n\r\n");
        sw.push("0000000056 00000 n\r\n");
        sw.push("0000000111 00000 n\r\n");
        sw.push("0000000212 00000 n\r\n");
        sw.push("0000000250 00000 n\r\n");
        sw.push("0000000317 00000 n\r\n");
        sw.push("trailer <</Size 7/Root 1 0 R>>\r\n");
        sw.push("startxref\r\n");
        sw.push("406\r\n");
        sw.push("%%EOF");
        return sw.join("");
    }
}

function imprimir(div) {
    var ventana = window.frames["print_frame"];
    if (ventana != null) {
        var pagina = document.body;
        mostrarControles(false);
        ventana.document.body.innerHTML = "";
        guardarValores(div);
        ventana.document.body.innerHTML = div.outerHTML;
        divVentana = ventana.document.getElementById(div.id);
        if (divVentana != null) recuperarValores(divVentana);
        ventana.focus();
        ventana.print();
        ventana.close();
        mostrarControles(true);
        document.body = pagina;
    }
}

function guardarValores(div) {
    console.log(div.childNodes);
    if (div.hasChildNodes()) {
        var controles = div.childNodes;
        var ncontroles = controles.length;
        var control;
        for (var i = 0; i < ncontroles; i++) {
            control = controles[i];
            if (control.tagName == "INPUT" && control.type == "text") {
                control.setAttribute("value", control.value);
            }
            guardarValores(control);
        }
    }
}

function recuperarValores(div) {
    if (div.hasChildNodes()) {
        var controles = div.childNodes;
        var ncontroles = controles.length;
        var control;
        for (var i = 0; i < ncontroles; i++) {
            control = controles[i];
            if (control.tagName == "INPUT" && control.type == "text") {
                control.value = control.getAttribute("value");
            }
            recuperarValores(control);
        }
    }
}

function mostrarControles(visible) {
    var controles = document.getElementsByClassName("NoImprimir");
    var ncontroles = controles.length;
    var estilo = (visible ? "inline" : "none");
    for (var j = 0; j < ncontroles; j++) {
        controles[j].style.display = estilo;
    }
}

function crearCombo(lista, cbo, primerItem) {
    var html = "";
    var nregistros = lista.length;
    if (primerItem) {
        html += "<option value=''>";
        html += primerItem;
        html += "</option>";
    }
    var campos = [];
    for (var i = 0; i < nregistros; i++) {
        campos = lista[i].split("|");
        html += "<option value='";
        html += campos[0];
        html += "'>";
        html += campos[1];
        html += "</option>";
    }
    //document.getElementById(cbo).innerHTML = html;
    cbo.innerHTML = html;
}

//Funciones para Popups
function resizePopup(popup, ancho, alto) {
    popup.style.width = ancho + "%";
    popup.style.height = alto + "%";
    popup.style.left = ((100 - ancho) / 2) + "%";
    popup.style.top = ((100 - alto) / 2) + "%";
}

function configurarArrastrePopup(divPopupContainer, divPopupWindow, divBarra) {
    divBarra.draggable = true;
    divBarra.ondragstart = function (event) {
        var ancho = getComputedStyle(divPopupWindow, null).getPropertyValue("left");
        var alto = getComputedStyle(divPopupWindow, null).getPropertyValue("top");
        var a = Math.floor(ancho.replace("px", ""));
        var b = Math.floor(alto.replace("px", ""));
        var x = (event.clientX > a ? event.clientX - a : a - event.clientX);
        var y = (event.clientY > b ? event.clientY - b : b - event.clientY);
        var punto = x + "," + y;
        event.dataTransfer.setData("text", punto);
    }
    divBarra.ondragover = function (event) {
        event.preventDefault();
    }
    divPopupContainer.ondragover = function (event) {
        event.preventDefault();
    }
    divPopupContainer.ondrop = function (event) {
        event.preventDefault();
        var x1 = event.clientX;
        var y1 = event.clientY;
        var puntoInicial = event.dataTransfer.getData("text");
        var punto = puntoInicial.split(",");
        var x2 = punto[0] * 1;
        var y2 = punto[1] * 1;
        divPopupWindow.style.left = (x1 - x2) + "px";
        divPopupWindow.style.top = (y1 - y2) + "px";
    }
}

function limpiarSeccion(clase, spn) {
    if (clase == null) clase = "P";
    if (spn == null) spn = spnValida;
    var controles = document.getElementsByClassName(clase);
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        var typecontrol = controles[i].type;
        if (typecontrol == "checkbox")
            controles[i].checked = false;
        else 
            controles[i].value = "";

        controles[i].style.borderColor = "";
        if (controles[i].getAttribute("data-img") != null) {
            var img = document.getElementById(controles[i].getAttribute("data-img"));
            if (img != null) img.src = "";
            var fup = document.getElementById(controles[i].getAttribute("data-fup"));
            if (fup != null) fup.value = null;
        }
    }
    spn.innerHTML = "";
}

function cargarSeccion(clase, campos) {
    var controles = document.getElementsByClassName(clase);
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        var typecontrol = controles[i].type;
        if (typecontrol == "checkbox") {
            if(campos[i]=='t')
                controles[i].checked = true;
            else
                controles[i].checked = false;
        } else {
            controles[i].value = campos[i];
        }
       
    }
}

function obtenerDatos(clase, sepCampo) {
    var data = "";
    if (clase == null) clase = "G";
    if (sepCampo == null) sepCampo = "|";
    var controles = document.getElementsByClassName(clase);
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        var typecontrol = controles[i].type;
        if (typecontrol == "checkbox")
            
            data += controles[i].checked;
        else 
            data += controles[i].value;
        if (i < ncontroles - 1) data += sepCampo;
    }
    return data;
}

//Funciones de Validacion
function validarDatos(claseReq, claseNum, spnValida) {
    var valido = false;
    if (validarRequeridos(claseReq)) {
        if (validarNumeros(claseNum)) {
            spnValida.innerHTML = "";
            valido = true;
        }
        else {
            spnValida.style.color = "blue";
            spnValida.innerHTML = "Los campos en color azul son numeros mayor a cero";
        }
    }
    else {
        spnValida.style.color = "red";
        spnValida.innerHTML = "Los campos en color rojo son obligatorios";
    }
    return valido;
}

function validarRequeridos(clase) {
    var ce = 0;
    var controles = document.getElementsByClassName(clase);
    var ncontroles = controles.length;
    for (var j = 0; j < ncontroles; j++) {
        if (controles[j].value == "") {
            controles[j].style.borderColor = "#02d3c7";
            ce++;
        }
        else controles[j].style.borderColor = "";
    }
    return (ce == 0);
}

function validarNumeros(clase) {
    var ce = 0;
    var controles = document.getElementsByClassName(clase);
    var ncontroles = controles.length;
    for (var j = 0; j < ncontroles; j++) {
        if (isNaN(controles[j].value)) {
            controles[j].style.borderColor = "blue";
            ce++;
        }
        else {
            var valor = (controles[j].value * 1);
            if (valor <= 0) {
                controles[j].style.borderColor = "blue";
                ce++;
            }
            else controles[j].style.borderColor = "";
        }
    }
    return (ce == 0);
}
function validarNumerosEnlinea(clase) {
    if (clase == null) clase = "N";
    var controles = document.getElementsByClassName(clase);
    var ncontroles = controles.length;
    for (var j = 0; j < ncontroles; j++) {
        controles[j].onkeyup = controles[j].onkeydown = function (event) {
            var keycode = ('which' in event ? event.which : event.keycode);
            var esValido = ((keycode > 47 && keycode < 58) || (keycode > 95 && keycode < 106) || keycode == 8 || keycode == 37 || keycode == 39 || keycode == 110 || keycode == 188);
            if (!esValido) this.value = this.value.removeCharAt(this.selectionStart);
        }
        controles[j].onpaste = function (event) {
            event.preventDefault();
        }
    }
}
function validarDecimalEnlinea(clase) {
    if (clase == null) clase = "D";
    var controles = document.getElementsByClassName(clase);
    var ncontroles = controles.length;
    for (var j = 0; j < ncontroles; j++) {
        controles[j].onkeyup = controles[j].onkeydown = function (event) {
            var keycode = ('which' in event ? event.which : event.keycode);
            var esValido = ((keycode > 47 && keycode < 58) || (keycode > 95 && keycode < 106) || keycode == 8 || keycode == 37 || keycode == 39 || keycode == 110 || keycode == 188 || keycode == 9);
            if (!esValido)
                event.preventDefault();
            //this.value = this.value.removeCharAt(this.selectionStart);
        }
        controles[j].onpaste = function (event) {
            event.preventDefault();
        }
    }
}
function validarDecimalesEnlinea(clase) {
    if (clase == null) clase = "D";
    var controles = document.getElementsByClassName(clase);
    var ncontroles = controles.length;
    for (var j = 0; j < ncontroles; j++) {
        controles[j].onkeyup = controles[j].onkeydown = function (event) {
            var keycode = ('which' in event ? event.which : event.keycode);
            var esValido = ((keycode > 47 && keycode < 58) || (keycode > 95 && keycode < 106) || keycode == 8 || keycode == 37 || keycode == 39 || keycode == 110 || keycode == 188 || (keycode == 190 && this.value.split(".").length < 3));
            if (!esValido) this.value = this.value.removeCharAt(this.selectionStart);
        }
        controles[j].onpaste = function (event) {
            event.preventDefault();
        }
    }
}
String.prototype.removeCharAt = function (i) {
    var tmp = this.split('');
    tmp.splice(i - 1, 1);
    return tmp.join('');
}
function cargarImagenes(clase, campos) {
    var controles = document.getElementsByClassName(clase);
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].src = "data:image/jpg;base64," + campos[i];
    }
}
function convertirFechaFormato(param) {

    var datadivied = param.split('-');
    var year = datadivied[0];
    var month = datadivied[1];
    var day = datadivied[2];

    return day + "/" + month + "/" + year;
}
function convertiraEdad(fecha) {
    // Si la fecha es correcta, calculamos la edad

    if (typeof fecha != "string" && fecha && esNumero(fecha.getTime())) {
        fecha = formatDate(fecha, "yyyy-MM-dd");
    }

    var values = fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth() + 1;
    var ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if (ahora_mes < mes) {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
        edad--;
    }
    if (edad > 1900) {
        edad -= 1900;
    }

    // calculamos los meses
    var meses = 0;

    if (ahora_mes > mes && dia > ahora_dia)
        meses = ahora_mes - mes - 1;
    else if (ahora_mes > mes)
        meses = ahora_mes - mes
    if (ahora_mes < mes && dia < ahora_dia)
        meses = 12 - (mes - ahora_mes);
    else if (ahora_mes < mes)
        meses = 12 - (mes - ahora_mes + 1);
    if (ahora_mes == mes && dia > ahora_dia)
        meses = 11;

    // calculamos los dias
    var dias = 0;
    if (ahora_dia > dia)
        dias = ahora_dia - dia;
    if (ahora_dia < dia) {
        ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }

    return edad + " año(s), " + meses + " mes(es) y " + dias + " día(s)";
}

function enLetras(param) {
    var res, dec = "";
    var entero=0;
    var decimales=0;
    var nro=0;

    nro = (param*1).toFixed(2);

    entero = Math.trunc(nro);
    decimales = 2;
    if (decimales > 0) {
        //console.log(param);
        var decimalpun = param.split('.');
        dec = " CON " + decimalpun[1] + "/100";
    }

    res = toText(entero) + dec;
    return res;
    
}
function toText(param) {

    console.log(param);

    var num2Text = "";
    var value = Math.trunc(param);
    if (value == 0) num2Text = "CERO";
    else if (value == 1) num2Text = "UNO";
    else if (value == 2) num2Text = "DOS";
    else if (value == 3) num2Text = "TRES";
    else if (value == 4) num2Text = "CUATRO";
    else if (value == 5) num2Text = "CINCO";
    else if (value == 6) num2Text = "SEIS";
    else if (value == 7) num2Text = "SIETE";
    else if (value == 8) num2Text = "OCHO";
    else if (value == 9) num2Text = "NUEVE";
    else if (value == 10) num2Text = "DIEZ";
    else if (value == 11) num2Text = "ONCE";
    else if (value == 12) num2Text = "DOCE";
    else if (value == 13) num2Text = "TRECE";
    else if (value == 14) num2Text = "CATORCE";
    else if (value == 15) num2Text = "QUINCE";
    else if (value < 20) num2Text = "DIECI" + toText((value*1) - 10);
    else if (value == 20) num2Text = "VEINTE";
    else if (value < 30) num2Text = "VEINTI" + toText((value*1) - 20);
    else if (value == 30) num2Text = "TREINTA";
    else if (value == 40) num2Text = "CUARENTA";
    else if (value == 50) num2Text = "CINCUENTA";
    else if (value == 60) num2Text = "SESENTA";
    else if (value == 70) num2Text = "SETENTA";
    else if (value == 80) num2Text = "OCHENTA";
    else if (value == 90) num2Text = "NOVENTA";
    else if (value < 100) num2Text = toText(Math.trunc((value*1) / 10) * 10) + " Y " + toText(value % 10);
    else if (value == 100) num2Text = "CIEN";
    else if (value < 200) num2Text = "CIENTO " + toText((value*1) - 100);
    else if ((value == 200) || (value == 300) || (value == 400) || (value == 600) || (value == 800)) num2Text = toText(Math.trunc((value*1) / 100)) + "CIENTOS";
    else if (value == 500) num2Text = "QUINIENTOS";
    else if (value == 700) num2Text = "SETECIENTOS";
    else if (value == 900) num2Text = "NOVECIENTOS";
    else if (value < 1000) num2Text = toText(Math.trunc((value*1) / 100) * 100) + " " + toText(value % 100);
    else if (value == 1000) num2Text = "MIL";
    else if (value < 2000) num2Text = "MIL " + toText(value % 1000);
    else if (value < 1000000) {
        num2Text = toText(Math.trunc((value*1) / 1000)) + " MIL";
        if ((value % 1000) > 0) num2Text = num2Text + " " + toText(value % 1000);
    }
    else if (value == 1000000) num2Text = "UN MILLON";
    else if (value < 2000000) num2Text = "UN MILLON " + toText(value % 1000000);
    else if (value < 1000000000000) {
        num2Text = toText(Math.trunc((value * 1) / 1000000)) + " MILLONES ";
        if ((value - Math.trunc((value * 1) / 1000000) * 1000000) > 0) num2Text = num2Text + " " + toText((value * 1) - Math.trunc((value*1) / 1000000) * 1000000);
    }
    else if (value == 1000000000000) num2Text = "UN BILLON";
    else if (value < 2000000000000) num2Text = "UN BILLON " + toText((value * 1) - Math.trunc((value * 1) / 1000000000000) * 1000000000000);
    else {
        num2Text = toText(Math.Truncate((value*1) / 1000000000000)) + " BILLONES";
        if (((value*1) - Math.Truncate(value / 1000000000000) * 1000000000000) > 0) num2Text = num2Text + " " + toText((value*1) - Math.Truncate((value*1) / 1000000000000) * 1000000000000);
    }

    return num2Text;
}
