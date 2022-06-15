<?php 
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once "../configuracion/Conexion.php";


class Modeloj extends Conexion
{
    public function acceso($usp,$parametro){
        
        $uspquery = 'CALL USPACCESO'.$usp.'(?)';
        $stmt = Conexion::conectar()->prepare($uspquery);
        $stmt->bindParam(1, $parametro, PDO::PARAM_STR);
        $stmt->execute();
        $csv = '';
        while($fila = $stmt->fetch()){ 
         $csv .=  utf8_encode($fila['data']);
			  }
        return $csv;

    }
    public function udpatetoken($usp,$parametro){
        
        $uspquery = 'CALL USPUPDATETOKEN'.$usp.'(?)';
        $stmt = Conexion::conectar()->prepare($uspquery);
        $stmt->bindParam(1, $parametro, PDO::PARAM_STR);
        $stmt->execute();
        $csv = '';
        while($fila = $stmt->fetch()){ 
         $csv .=  utf8_encode($fila['data']);
			  }
        return $csv;

    }
    public function validar($usp,$parametro){
        
        $uspquery = 'CALL USPVALIDARTOKENBY'.$usp.'(?)';
        $stmt = Conexion::conectar()->prepare($uspquery);
        $stmt->bindParam(1, $parametro, PDO::PARAM_STR);
        $stmt->execute();
        $csv = '';
        while($fila = $stmt->fetch()){ 
         $csv .=  utf8_encode($fila['data']).'¬';
		}
        return $csv;

    }
    public function listar($usp,$parametro){
        
        $uspquery = 'CALL USPLISTARSOLICITUDBY'.$usp.'(?)';
        $stmt = Conexion::conectar()->prepare($uspquery);
        $stmt->bindParam(1, $parametro, PDO::PARAM_STR);
     
        $stmt->execute();
        $csv = '';
        while($fila = $stmt->fetch()){ 
         $csv .=  utf8_encode($fila['data']).'¬';
		}
        return $csv;

    }
    public function listarexamen($usp,$parametro){
        
        $uspquery = 'CALL USPGETEXEXAMENBY'.$usp.'(?)';
        $stmt = Conexion::conectar()->prepare($uspquery);
        $stmt->bindParam(1, $parametro, PDO::PARAM_STR);
        $stmt->execute();
        $csv = '';
        while($fila = $stmt->fetch()){ 
         $csv .=  utf8_encode($fila['data']).'¬';
		}
        return $csv;

    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public function createPacienteModel($datosModel,$tabla){
        
        $stmt = Conexion::conectar()->prepare("CALL USP_INSERTORUPDATEARPACIENTE(:pidpaciente,
        :pdni,:pfechanacimiento,:pnombres,:papellidopaterno,:papellidomaterno,:pcorreo,
        :ptelefono,:pcelular,:ppassword,:psexo,:ptipodocumento)");

        $stmt->bindParam(":pidpaciente",$datosModel["pidpaciente"],PDO::PARAM_INT);
        $stmt->bindParam(":pdni",$datosModel["pdni"],PDO::PARAM_STR);
        $stmt->bindParam(":pfechanacimiento",$datosModel["pfechanacimiento"],PDO::PARAM_STR);
        $stmt->bindParam(":pnombres",$datosModel["pnombres"],PDO::PARAM_STR);
        $stmt->bindParam(":papellidopaterno",$datosModel["papellidopaterno"],PDO::PARAM_STR);
        $stmt->bindParam(":papellidomaterno",$datosModel["papellidomaterno"],PDO::PARAM_STR);
        $stmt->bindParam(":pcorreo",$datosModel["pcorreo"],PDO::PARAM_STR);
        $stmt->bindParam(":ptelefono",$datosModel["ptelefono"],PDO::PARAM_STR);
        $stmt->bindParam(":pcelular",$datosModel["pcelular"],PDO::PARAM_STR);
        $stmt->bindParam(":ppassword",$datosModel["ppassword"],PDO::PARAM_STR);
        $stmt->bindParam(":psexo",$datosModel["psexo"],PDO::PARAM_STR);
        $stmt->bindParam(":ptipodocumento",$datosModel["ptipodocumento"],PDO::PARAM_STR);
        if($stmt->execute()){
                
                return true;
        }
        else{
           
            return false;
        }
    }
    public function createMedicoModel($datosModel,$tabla){
        
        $stmt = Conexion::conectar()->prepare("CALL USP_INSERTORUPDATEARMEDICO(:midmedico,
        :mdni,:mnombres,:mapellidopaterno,:mapellidomaterno,:mcelular,
        :mtelefonocasa,:mcorreo,:mpassword)");

        $stmt->bindParam(":midmedico",$datosModel["midmedico"],PDO::PARAM_INT);
        $stmt->bindParam(":mdni",$datosModel["mdni"],PDO::PARAM_STR);
        $stmt->bindParam(":mnombres",$datosModel["mnombres"],PDO::PARAM_STR);
        $stmt->bindParam(":mapellidopaterno",$datosModel["mapellidopaterno"],PDO::PARAM_STR);
        $stmt->bindParam(":mapellidomaterno",$datosModel["mapellidomaterno"],PDO::PARAM_STR);
        $stmt->bindParam(":mcelular",$datosModel["mcelular"],PDO::PARAM_STR);
        $stmt->bindParam(":mtelefonocasa",$datosModel["mtelefonocasa"],PDO::PARAM_STR);
        $stmt->bindParam(":mcorreo",$datosModel["mcorreo"],PDO::PARAM_STR);
        $stmt->bindParam(":mpassword",$datosModel["mpassword"],PDO::PARAM_STR);

        if($stmt->execute()){
                
                return true;
        }
        else{
           
            return false;
        }
    }
    public function createEmpresaModel($datosModel,$tabla){
        
        $stmt = Conexion::conectar()->prepare("CALL USP_INSERTORUPDATEAREMPRESA(:eidempresa,:eruc,:erazonsocial,:ecorreo,:ecelular,:etelefono,:elogin,:epassword,:ecodcliente)");

        $stmt->bindParam(":eidempresa",$datosModel["eidempresa"],PDO::PARAM_INT);
        $stmt->bindParam(":eruc",$datosModel["eruc"],PDO::PARAM_STR);
        $stmt->bindParam(":erazonsocial",$datosModel["erazonsocial"],PDO::PARAM_STR);
        $stmt->bindParam(":ecorreo",$datosModel["ecorreo"],PDO::PARAM_STR);
        $stmt->bindParam(":ecelular",$datosModel["ecelular"],PDO::PARAM_STR);
        $stmt->bindParam(":etelefono",$datosModel["etelefono"],PDO::PARAM_STR);
        $stmt->bindParam(":elogin",$datosModel["elogin"],PDO::PARAM_STR);
        $stmt->bindParam(":epassword",$datosModel["epassword"],PDO::PARAM_STR);
        $stmt->bindParam(":ecodcliente",$datosModel["ecodcliente"],PDO::PARAM_STR);
        if($stmt->execute()){
                
                return true;
        }
        else{
           
            return false;
        }
    }
    
    public function eliminarSolicitudModel($numero){
        $stmt = Conexion::conectar()->prepare(" delete from solicitud where s_numero = $numero; ");
        if($stmt->execute()){
                return true;
        }
        else{
            return false;
        }
    }
    public function eliminarLaboratorioModel($numero){
        $stmt = Conexion::conectar()->prepare(" delete from laboratorio where l_numsolicitud = $numero;");
       if($stmt->execute()){
                return true;
        }
        else{
            return false;
        }
    }
    
    public function createSolicitudModel($pos1,$pos2,$pos3,$pos4,$pos5,$pos6,$pos7,$pos8,$pos9,$pos10,$pos11)
    {
        
        $stmt = Conexion::conectar()->prepare("CALL USP_INSERTORUPDATEARSOLICITUD(?,?,?,?,?,?,?,?,?,?,?)");
        $stmt->bindParam(1, $pos1);
        $stmt->bindParam(2, $pos2);
        $stmt->bindParam(3, $pos3);
        $stmt->bindParam(4, $pos4);
        $stmt->bindParam(5, $pos5);
        $stmt->bindParam(6, $pos6);
        $stmt->bindParam(7, $pos7);
        $stmt->bindParam(8, $pos8);
        $stmt->bindParam(9, $pos9);
        $stmt->bindParam(10, $pos10);
        $stmt->bindParam(11, $pos11);
        if($stmt->execute())
        {
                
            return true;
        } 
        else{
           
            return false;
        }

    }
    public function createLaboratorioModel($datosModel,$tabla){
         
        try{
        
            $stmt = Conexion::conectar()->prepare("CALL USP_INSERTORUPDATELABORATORIO(
            :snumero,:ssede,:sfecha,:sedad,:sobservacion,:sidpaciente,:sidmedico,:sidempresa,:sparcial,:sprocesado,:sterminado,:scama,:sfechavalidacion,:snotas,:sordenhospital,:sprefac,:snumregistro,
            :lperfil,:lgrupo,:lexamen,:lidanalisis,:lanalisis,:lresultado,:lunidad,:lreferencial,:lobservacion,:lmetodo,:lorden,:lrecomendacion,:lmin,:lmax,:lordenexamen,:lfechavalidacion)");
    
            $stmt->bindParam(":snumero",$datosModel["snumero"],PDO::PARAM_STR);
            $stmt->bindParam(":ssede",$datosModel["ssede"],PDO::PARAM_STR);
            $stmt->bindParam(":sfecha",$datosModel["sfecha"],PDO::PARAM_STR);
            $stmt->bindParam(":sedad",$datosModel["sedad"],PDO::PARAM_STR);
            $stmt->bindParam(":sobservacion",$datosModel["sobservacion"],PDO::PARAM_STR);
            $stmt->bindParam(":sidpaciente",$datosModel["sidpaciente"],PDO::PARAM_INT);
            $stmt->bindParam(":sidmedico",$datosModel["sidmedico"],PDO::PARAM_INT);
            $stmt->bindParam(":sidempresa",$datosModel["sidempresa"],PDO::PARAM_INT);
            $stmt->bindParam(":sparcial",$datosModel["sparcial"],PDO::PARAM_INT);
            $stmt->bindParam(":sprocesado",$datosModel["sprocesado"],PDO::PARAM_INT);
            $stmt->bindParam(":sterminado",$datosModel["sterminado"],PDO::PARAM_STR);
            $stmt->bindParam(":scama",$datosModel["scama"],PDO::PARAM_STR);
            $stmt->bindParam(":sfechavalidacion",$datosModel["sfechavalidacion"],PDO::PARAM_STR);
            $stmt->bindParam(":snotas",$datosModel["snotas"],PDO::PARAM_STR);
            $stmt->bindParam(":sordenhospital",$datosModel["sordenhospital"],PDO::PARAM_STR);
            $stmt->bindParam(":sprefac",$datosModel["sprefac"],PDO::PARAM_STR);
            $stmt->bindParam(":snumregistro",$datosModel["snumregistro"],PDO::PARAM_STR);
    
            $stmt->bindParam(":lperfil",$datosModel["lperfil"],PDO::PARAM_STR);
            $stmt->bindParam(":lgrupo",$datosModel["lgrupo"],PDO::PARAM_STR);
            $stmt->bindParam(":lexamen",$datosModel["lexamen"],PDO::PARAM_STR);
            $stmt->bindParam(":lidanalisis",$datosModel["lidanalisis"],PDO::PARAM_STR);
            $stmt->bindParam(":lanalisis",$datosModel["lanalisis"],PDO::PARAM_STR);
            $stmt->bindParam(":lresultado",$datosModel["lresultado"],PDO::PARAM_STR);
            $stmt->bindParam(":lunidad",$datosModel["lunidad"],PDO::PARAM_STR);
            $stmt->bindParam(":lreferencial",$datosModel["lreferencial"],PDO::PARAM_STR);
            $stmt->bindParam(":lobservacion",$datosModel["lobservacion"],PDO::PARAM_STR);
            $stmt->bindParam(":lmetodo",$datosModel["lmetodo"],PDO::PARAM_STR);
            $stmt->bindParam(":lorden",$datosModel["lorden"],PDO::PARAM_INT);
            $stmt->bindParam(":lrecomendacion",$datosModel["lrecomendacion"],PDO::PARAM_STR);
            $stmt->bindParam(":lmin",$datosModel["lmin"],PDO::PARAM_STR);
            $stmt->bindParam(":lmax",$datosModel["lmax"],PDO::PARAM_STR);
            $stmt->bindParam(":lordenexamen",$datosModel["lordenexamen"],PDO::PARAM_INT);
            $stmt->bindParam(":lfechavalidacion",$datosModel["lfechavalidacion"],PDO::PARAM_STR);
    
            if($stmt->execute()){
                    
                    return true;
            }
            else{
               
                return false;
            }
            
            
        }
        catch(Exception $e) {
            
        }
         
       
    }
    public function getLaboratorioModel($datosModel,$tabla){
        
        $dato = ["'", '"'];
        $remplazo   = ["M", "S"];
        
        
        $stmt = Conexion::conectar()->prepare("SELECT l_idanalisis,l_examen,l_analisis,  l_resultado,l_orden FROM $tabla where l_numsolicitud=$datosModel");
        $stmt->execute();
        
        $stmt->bindColumn("l_idanalisis", $idanalisis);
        $stmt->bindColumn("l_examen", $examen);
		$stmt->bindColumn("l_analisis", $analisis);
		$stmt->bindColumn("l_resultado", $resultado);
		$stmt->bindColumn("l_orden", $orden);
	

		$laboratorio = array();
		//$sb = new StringBuilder();

		while($fila = $stmt->fetch(PDO::FETCH_BOUND)){
			
			$pro = array();
			
			$pro['idanalisis'] = utf8_encode($idanalisis);
			$pro['examen'] = utf8_encode($examen);
			$pro['analisis'] = utf8_encode($analisis);
			$pro['resultado']= str_replace($dato,$remplazo,$resultado);
			//$pro['resultado'] = utf8_encode($resultado);
			$pro['orden'] = utf8_encode($orden);
			array_push($laboratorio, $pro);
			
            /* $examenitem = utf8_encode($fila[0]);
             $sb->append($examenitem.'|');
             $analisisitem = utf8_encode($fila[1]);
             $sb->append($analisisitem.'|');
             $resultadoitem = utf8_encode($fila[2]);
             $sb->append($resultadoitem.'|');
             $ordenitem = utf8_encode($fila[3]);
             $sb->append($ordenitem.'¬');*/
		}

		return $laboratorio;
       // return $sb;
        
    }
     public function deleteLaboratorioModel($numero,$idana,$tabla){
        
        $stmt = Conexion::conectar()->prepare("delete from $tabla where l_numsolicitud = $numero and l_idanalisis = $idana ");

        if($stmt->execute()){
                
                return true;
        }
        else{
           
            return false;
        }
    }
     
    public function deleteLaboratorioModelAll($numero,$idana,$tabla){
        
        $stmt = Conexion::conectar()->prepare("delete from $tabla where l_numsolicitud = $numero and l_idanalisis in ($idana) ");

        if($stmt->execute()){
                
                return true;
        }
        else{
           
            return false;
        }
    }
    public function ActualizarSolicitudModel($numero,$tabla){
        
        $stmt = Conexion::conectar()->prepare(" UPDATE $tabla set s_terminado = 'EN PROCESO' where s_numero = $numero ");
   
        if($stmt->execute()){
                return true;
        }
        else{
            return false;
        }
    }
    
    
    public function createFormularioCovidModel($pos1,$pos2,$pos3,$pos4,$pos5,$pos6,$pos7,$pos8,$pos9,$pos10,
          $pos11,$pos12,$pos13,$pos14,$pos15,$pos16,$pos17,$pos18,$pos19,$pos20,
          $pos21,$pos22,$pos23,$pos24,$pos25,$pos26,$pos27,$pos28,$pos29,$pos30,
          $pos31,$pos32,$pos33,$pos34,$pos35,$pos36,$pos37,$pos38,$pos39,$pos40,
          $pos41,$pos42,$pos43,$pos44,$pos45,$pos46,$pos47,$pos48,$pos49,$pos50,
          $pos51,$pos52,$pos53,$pos54,$pos55,$pos56,$pos57,$pos58,$pos59,$pos60,
          $pos61,$pos62,$pos63,$pos64,$pos65,$pos66,$pos67,$pos68,$pos69) 
    { 
          $stmt = Conexion::conectar()->prepare("CALL USP_INSERTUPDATEFormularioCovid(
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?) ");
         
           
    	           $stmt->bindParam(1, $pos1);
                   $stmt->bindParam(2, $pos2);
                   $stmt->bindParam(3, $pos3);
                   $stmt->bindParam(4, $pos4);
                   $stmt->bindParam(5, $pos5);
                   $stmt->bindParam(6, $pos6);
                   $stmt->bindParam(7, $pos7);
                   $stmt->bindParam(8, $pos8);
                   $stmt->bindParam(9, $pos9);
                   $stmt->bindParam(10, $pos10);
                   $stmt->bindParam(11, $pos11);
                   $stmt->bindParam(12, $pos12);
                   $stmt->bindParam(13, $pos13);
                   $stmt->bindParam(14, $pos14);
                   $stmt->bindParam(15, $pos15);
                   $stmt->bindParam(16, $pos16);
                   $stmt->bindParam(17, $pos17);
                   $stmt->bindParam(18, $pos18);
                   $stmt->bindParam(19, $pos19);
                   $stmt->bindParam(20, $pos20);
                   
                   
    	           $stmt->bindParam(21, $pos21);
                   $stmt->bindParam(22, $pos22);
                   $stmt->bindParam(23, $pos23);
                   $stmt->bindParam(24, $pos24);
                   $stmt->bindParam(25, $pos25);
                   $stmt->bindParam(26, $pos26);
                   $stmt->bindParam(27, $pos27);
                   $stmt->bindParam(28, $pos28);
                   $stmt->bindParam(29, $pos29);
                   $stmt->bindParam(30, $pos30);
                   $stmt->bindParam(31, $pos31);
                   $stmt->bindParam(32, $pos32);
                   $stmt->bindParam(33, $pos33);
                   $stmt->bindParam(34, $pos34);
                   $stmt->bindParam(35, $pos35);
                   $stmt->bindParam(36, $pos36);
                   $stmt->bindParam(37, $pos37);
                   $stmt->bindParam(38, $pos38);
                   $stmt->bindParam(39, $pos39);
                   $stmt->bindParam(40, $pos40);
                   
                   $stmt->bindParam(41, $pos41);
                   $stmt->bindParam(42, $pos42);
                   $stmt->bindParam(43, $pos43);
                   $stmt->bindParam(44, $pos44);
                   $stmt->bindParam(45, $pos45);
                   $stmt->bindParam(46, $pos46);
                   $stmt->bindParam(47, $pos47);
                   $stmt->bindParam(48, $pos48);
                   $stmt->bindParam(49, $pos49);
                   $stmt->bindParam(50, $pos50);
                   $stmt->bindParam(51, $pos51);
                   $stmt->bindParam(52, $pos52);
                   $stmt->bindParam(53, $pos53);
                   $stmt->bindParam(54, $pos54);
                   $stmt->bindParam(55, $pos55);
                   $stmt->bindParam(56, $pos56);
                   $stmt->bindParam(57, $pos57);
                   $stmt->bindParam(58, $pos58);
                   $stmt->bindParam(59, $pos59);
                   $stmt->bindParam(60, $pos60);
         
         
                   $stmt->bindParam(61, $pos61);
                   $stmt->bindParam(62, $pos62);
                   $stmt->bindParam(63, $pos63);
                   $stmt->bindParam(64, $pos64);
                   $stmt->bindParam(65, $pos65);
                   $stmt->bindParam(66, $pos66);
                   $stmt->bindParam(67, $pos67);
                   $stmt->bindParam(68, $pos68);
                   $stmt->bindParam(69, $pos69);
        
            if($stmt->execute())
            {
                return true;
            }
            else
            {
                return false;
            }
    } 
   
    
}

?>