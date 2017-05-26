//creamos nuestro modulo llamado app
var app = angular.module("app", ['ngRoute','treeControl', 'ngTable', 'ngAnimate','ui.bootstrap','chart.js','ngMaterial']);

app.constant('urls', {
    BASE: '/SIG/rest',
    BASELOGIN: '/SIG/'
});

app.config(['$httpProvider','$routeProvider',function($httpProvider,$routeProvider) {

    //hacemos el ruteo de las interfaces de nuestra aplicación
    $routeProvider.when("/menuInicio", {
        templateUrl : "menuInicio.html"
    })
    .when("/subMenuInicio", {
        templateUrl : "subMenuInicio.html"
    })
   
   
    //Fin funciones que todos los usuarios tienen
    .otherwise({ redirectTo : "/"});
    

}]);

//metodo run se inicia una sola vez
app.run(['$rootScope','$location','urls','crud',function($rootScope,$location, urls,crud) {
     
    if( window.innerWidth < 479 ){
        $rootScope.movil = true;
    }
        
    $rootScope.usuMaster = {usuario:"",rol:"",organizacion:""};
    $rootScope.menuPrincipal = [];
    
    $rootScope.noticias = [{hora:"0:0",titulo:"noticia nueva",descripcion:"descripcion"},{hora:"0:0",titulo:"noticia nueva",descripcion:"descripcion"}];
    $rootScope.notificaciones = [];//[{tipo:"alert-info",nombre:"notificacino de alerta"},{tipo:"alert-danger",nombre:"notificacino de peligro"},{tipo:"alert-warning",nombre:"notificacino de exito"}];
    $rootScope.mensajes = [];//[{nombre:"profesor",hora:"10:00",contenido:"hola como estas"},{nombre:"profesor",hora:"10:00",contenido:"hola como estas"}];
    
    
    $rootScope.menu = [];
    $rootScope.modNom = "";
    $rootScope.subModNom = "";
    $rootScope.visNom = "";    
    //configuracion inicial "no tocar"
    
    $rootScope.inicio = function(){
        $rootScope.menu = [];
        $rootScope.modNom = "";
        $rootScope.subModNom = "";
        $rootScope.visNom = "";
        $location.path("menuInicio");
    };
        
    $rootScope.elegirMenu = function(menu){        
        $rootScope.menu = menu.subModulos;
        $rootScope.modNom = $rootScope.movil? menu.codigo: menu.nombre;
        localStorage.setItem('menu', JSON.stringify($rootScope.menu));
        localStorage.setItem('modNom', $rootScope.modNom);
        $rootScope.subModNom = "";
        $rootScope.visNom = "";
        $rootScope.color = menu.color;
        $location.path("subMenuInicio");
    };
    $rootScope.menuToggle = function(e,subModulo){
        if(subModulo.funciones){
            if($rootScope.subModNom == ($rootScope.movil? subModulo.codigo: subModulo.nombre)){
                $rootScope.subModNom = "";
                localStorage.setItem('subModNom', "");
                $location.path("subMenuInicio");
            }
            else{                
                $rootScope.subModNom = $rootScope.movil? subModulo.codigo: subModulo.nombre;
                localStorage.setItem('subModNom', $rootScope.subModNom);
            }
            $rootScope.visNom = "";            
        }
    };
    $rootScope.elegirVista = function(vista,subModulo){
        $rootScope.visNom = vista.nombre;
        localStorage.setItem('visNom', JSON.stringify($rootScope.visNom));
        if(subModulo){
            $rootScope.subModNom = $rootScope.movil? subModulo.codigo: subModulo.nombre;;
            localStorage.setItem('subModNom', $rootScope.subModNom);
        }
        else{
            //ocultar siempre que elijamos una opcion, solo para moviles
            if(window.innerWidth < 981){
                $('#sidebar').toggleClass('hide-left-bar');
                $('#main-content').toggleClass('merge-left');
            }
        }
        $location.path(vista.clave);
    };
    $rootScope.ocultarMenu = function(){
        $('#sidebar').toggleClass('hide-left-bar');
        $('#main-content').toggleClass('merge-left');
    };
    $rootScope.mostrarMenuDerecha = function(){
        $('.right-sidebar').toggleClass('hide-right-bar');
        $('#main-content').toggleClass('merge-right');
    };
    $rootScope.verAyuda = function(){
        
        var o = buscarObjeto($rootScope.menu,'nombre',$rootScope.subModNom);
        if(o){
            $rootScope.imgAyuda = o.codigo.trim()+'.png';
            $('#modalAyuda').modal('show');
        }
    };
   
   
    //comprimiendo los menus
    //$('.sub-menu .sub').css({"display":"none"});
    //Fin
    /*
    $rootScope.menu = $rootScope.menuPrincipal[0].subModulos;
    $rootScope.modNom = $rootScope.menuPrincipal[0].nombre;*/
    
    
    //funcion que se llama antes de cambiar la ruta (link)
    /*
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        alert("next: "+next.templateUrl+"   current: "+current);
        
        if ( localStorage.getItem('jwt') == null ) {
            $window.location.href = $window.location.href + "/";
        }
        else {
            //var usuario = localStorage.getItem('usuario');

            if( next.templateUrl == 'app/login.html' )
                $window.location.href = $window.location.href + "/";
                //(next.templateUrl == 'views/inicio.html' || usuario.puesto != 1) {
                    //$location.path('/tareas');
                //}
        }
    });*/
    
}]);




