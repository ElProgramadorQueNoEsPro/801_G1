<?php

ob_start();
session_start();
$_SESSION["usuario"] = "niño";


if($_SESSION["usuario"] == 'paciente')        
{
    echo '
                 <li class="enlace " >
                     <a   class="nav__link active" onclick=navegar("solicitud.php")>Solicitud</a>
                 </li>
                 <li class="enlace" >
                    <a class="nav__link active" href="cotizacion.php">Cotización</a>
                 </li >
                  <li class="enlace">
                  <i class="nav__icon"></i><a class="nav__link active" href="listaexamenes.php">Examenes</a>
                 </li>
                 <li class="enlace" > 
                     <a class="nav__link active" href="datos.php">Datos</a>
                 </li>
                 <li class="enlace" > 
                 <a class="nav__link active" href="promociones.php">Promociones</a>
                </li>                
     ';
}
else if($_SESSION["usuario"] == "niño"){
           echo '
           <li class="enlace">
           <a class="nav__link active" onclick=navegar("pesotalla.php")><i class="fas fa-envelope"></i>Peso y Talla</a>
           </li>
           <li class="enlace" >
             <a class="nav__link active" onclick=navegar("vacunas.php")><i class="fas fa-clipboard-user"></i>Vacunas</a>
           </li>
           <li class="enlace" >
             <a class="nav__link active" onclick=navegar("centrovac.php")><i class="fas fa-money-check-alt"></i>Centros de vacunación</a>
           </li>
           <li class="enlace" >
               <a class="nav__link active" onclick=navegar("informacion.php")><i class="far fa-file-medical-alt"></i>Información</a>
           </li>
           <li class="enlace">
               <a class="nav__link active" onclick=navegar("pediatria.php")><i class="fas fa-calendar"></i>Pediatra</a>
           </li>
           <li class="enlace">
               <a class="nav__link active" onclick=navegar("reprocita.php")><i class="fas fa-user-md"></i>Reprogramar Cita</a>
           </li>
           ';     
}
else if($_SESSION["usuario"] == 'empresa'){
         echo '
         <li class="enlace" >
         <a class="nav__link active" href="solicitudempresa.php" >Solicitud</a>
         </li>
         <li class="enlace">
           <a class="nav__link active" href="cotizacion.php" >Cotización</a>
         </li>
         <li class="enlace">
           <a class="nav__link active" href="listaexamenes.php" >Examenes</a>
         </li>
         <li class="enlace">
             <a class="nav__link active" href="cita.php" >Cita</a>
         </li>
         <li class="enlace">
             <a class="nav__link active" href="pacientes.php" >Pacientes</a>
         </li>
         <li class="enlace">
               <a class="nav__link active" href="promociones.php" >Promociones</a>
           </li>
         ';
}
else{

         echo '
         <li class="enlace" >
         <a href="solicitudusuario.php" ><i class="fa fa-envelope" style="color: #337ab7;"></i> Solicitudes</a>
         </li>
         
         <li class="enlace">
           <a href="empresa.php" ><i class="fa fa-users" style="color: #337ab7;"></i> Empresa</a>
         </li>
         <li class="enlace">
             <a href="listaexamenes.php" ><i class="fa fa-file-text" style="color: #337ab7;" ></i> Exámenes y Perfiles</a>
         </li>
         <li class="enlace">
             <a href="informacion.php" ><i class="fa fa-info" style="color: #337ab7;" ></i> Informaci&oacute;n</a>
         </li>
         ';

}  
?>