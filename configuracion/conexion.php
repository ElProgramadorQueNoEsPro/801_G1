<?php 

class Conexion{
    public function conectar(){
        $localhost = "localhost";
        $database = "";
        $user = "";
        $password = "";
        $link = new PDO("mysql:host=$localhost;dbname=$database",$user,$password,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES  \'UTF8\''));
        return $link;
    }
}

?>