<?php

require_once '../modelo/Modelo.php';
$response = array();
if(isset($_GET['apicall'])){

  switch ($_GET['apicall']){
 
	case 'acceso':
		$db = new Modeloj();
		$data = $_POST['parametro'];
        $usp  = strtoupper(explode('¬',$data)[0]);
        $parametro  = explode('¬',$data)[1];
		$resul = $db->acceso($usp,$parametro);
        if(!empty($resul)){ // si es diferente vacío
			//se genera un token...
			$token = md5(uniqid(rand(), true));.
			$id = explode('|',$resul)[0];
			$param = $id."|".$token;
			$resultoken = $db->udpatetoken($usp,$param);
			if(!empty($resultoken)){
				$response = 'Exito¬'.$usp.'|'.$resultoken.'|'.$resul;
			}
			else{
				$response = 'Sin Exito¬Hubo un problema token';
			}
		}
		else{
			$response = 'Sin Exito¬No existe el '.$usp;
		}
		
	 break;
	 
	 case 'listar':
		 $db = new Modeloj();
	     $usp = $_GET['Entidad'];
		 $id = $_GET['ID'];
		 $token = $_GET['Token'];
		 //VALIDAR 
		 $parametro =  $id.'|'.$token;
		 $resul = $db->validar($usp,$parametro);
		 if($resul == '0'){
			$response = 'False^Sera reedireccionado';
		 }
		 else{
			$response = $db->listar($usp,$id);
			if($usp=='PACIENTE')
			{
			   $cabecera ='N° Solicitud|Sede|Fecha|Estado¬100|300|200|100¬String|String|String|String';
			   $response = 'True'.'^'.$cabecera.'¬'.$response;
			}
			else{

				$dataserializada ="";
				$sid ="";
				//$data = array();
			    $listadata = $response.explode('¬',$response);
				$nlistadata = count($listadata);
				for ($x = 0; $x <$nlistadata; $x++) {
					$idsol =  explode('|',$listadata[$x])[0];
					$sid.=$idsol.',';
				}
				$cadenaid = substr($sid, 0, -1);
				if(!empty($cadenaid)){
				}

				
				$cadenaid = substr($sid, 0, -1);
			}
		 }
		 
	  break;
     case 'createpaciente':
		isTheseParametersAvailable(array('data')); 
     break;
     case 'loginpaciente':
       
      $response = 'exito';
     break;
     default:
       $response['error'] = true;
       $response['message'] = 'No existe el function: '.$_GET['apicall'];
  }

}
else
{
	
	$response['error'] = true;
	$response['message'] = 'Invalid API Call';
}

echo $response;


function isTheseParametersAvailable($params){
	//suponiendo que todos los parametros estan disponibles
	$available = true;
	$missingparams = "";

	foreach ($params as $param) {
		if(!isset($_POST[$param]) || strlen($_POST[$param]) <= 0){
			$available = false;
			$missingparams = $missingparams . ", " . $param;
		}
	}

	//si faltan parametros
	if(!$available){
		$response = array();
		$response['error'] = true;
		$response['message'] = 'Parametro' . substr($missingparams, 1, strlen($missingparams)) . ' vacio';

		echo json_encode($response);


		die();
	}
}
function isVerificarToken($params){


}

?>