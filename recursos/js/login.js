var urllocation ="";
window.onload = function () {
  window.localStorage.clear();
  urllocation = window.location;
  CargarBotones();
    
}
function CargarBotones(){
    document.getElementById("btnAceptar").onclick = function () {
       var resul = validarRequeridos("R");
       if(resul){
         var entidad = titulo.innerHTML;
        
         var frm =  new FormData();
         var param = obtenerDatos('G');
         frm.append('parametro',entidad+"¬"+param);
         Http.post("../ResultadosOnline/controller/Sistema.php?apicall=acceso", mostrarResulOrden,frm);
       }
       else{alert("no ingreso el usuario y el pasword");}
    }
    document.getElementById("btn-icon").onclick = function () {
      document.getElementById("sesamo").style.display="inline";
      document.getElementById("txt-first").style.display="none";
      document.getElementById("link").style.display="inline";
  }
}
function mostrarResulOrden(rpta){
   //alert(rpta);
   if(rpta!=""){
     var dato = rpta.split('¬');
     if(dato[0]=="Exito"){
       // entrar al sistema
       localStorage.setItem('usuario',dato[1]);
       location.href = "../vista/inicio.php";
       
     }
     else{
      alert(dato[1]);
     }
     //guardar los datos del paciente...

   }
}