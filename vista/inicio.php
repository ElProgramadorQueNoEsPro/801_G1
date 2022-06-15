<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet'>
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <link rel="stylesheet" href="../recursos/css/Inicio.css?v=2.8">
    <title>Vacunin</title>
</head>
<body id="body-pd">
    <header class="header" id="header">
        <div class="header__toggle">
            <i class='bx bx-menu' id="header-toggle"></i>
        </div>
        <div class="">
           <h2 class="Menu-Titulo">Vacunin </h2>
        </div>
        <div class="header__img">
            <img src="" alt="">
        </div>
    </header>

    <div class="l-navbar" id="nav-bar">
        <nav class="nav" >
            <div>
                <a href="#" class="nav__logo" >
                    <i class='bx bx-layer nav__logo-icon'></i>
                    <span class="nav__logo-name">Resultados</span>
                </a>
                <div class="nav__list">
                    <ul class="miMenu" id="menu">
                        <?php
                        include "enlace.php";
                        ?>
                    </ul>
                </div>
            </div>
            <a href="#" class="nav__link">
                <i  class='bx bx-log-out nav__icon salir'></i>
                <span  class="nav__name salir">Salir</span>
            </a>
        </nav>
    </div>
    

    <iframe id="ifrPagina" name="ifrPagina" style="width:100%;height:950px;border:0;"></iframe>
    <input id="hdfRaiz" type="hidden" value='@Url.Content("~")' />

    
    <script src="../recursos/js/Inicio.js?v=1.267"></script>
    <script type="text/javascript">
        function showNavbar(toggleId, navId, bodyId, headerId) {
            var toggle = document.getElementById(toggleId);
            var nav = document.getElementById(navId);
            var bodypd = document.getElementById(bodyId);
            var headerpd = document.getElementById(headerId);

            //Validate that all variables exist
            if (toggle && nav && bodypd && headerpd) {
                toggle.addEventListener('click', function () {
                    nav.classList.toggle('show');
                    toggle.classList.toggle('bx-x');
                    bodypd.classList.toggle('body-pd');
                    headerpd.classList.toggle('body-pd');
                });
            }
        }

        showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');

        /*===== LINK ACTIVO  =====*/
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
    </script>  
</body>
</html>