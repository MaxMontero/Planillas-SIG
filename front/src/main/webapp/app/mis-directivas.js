'use strict';


app.directive('confirmacion',['$compile', function ($compile) {
return {
    replace: true,
    restrict: 'E',
    scope: {
        titulo:'@',
        contenido:'@',
        mensaje:'@',
        accion: '=',
        width:'@'
    },
    template:
            '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
                '<div class="modal-dialog dlg-confirmacion" style="max-width:{{width}}px">'+
                  '<div class="modal-content">'+
                    '<div class="modal-header">'+
                      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                      '<h4 class="modal-title" id="myModalLabel">{{titulo?titulo:"DIALOGO DE CONFIRMACION"}}</h4>'+
                    '</div>'+
                    '<div class="modal-body">{{mensaje}}</div>'+
                    '<div class="modal-footer">'+
                      '<button ng-if="accion" type="button" class="btn btn-default" ng-click="funcionNo()"><i class="fa fa-times" ></i> No</button>'+
                      '<button ng-if="accion" type="button" class="btn btn-warning" ng-click="funcionSi()"><i class="fa fa-check" ></i> Si</button>'+
                      '<button ng-if="!accion" type="button" class="btn btn-warning" ng-click="funcionNo()"><i class="fa fa-check" ></i> Aceptar</button>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>'
      ,
      link: function(scope,elem,attrs){
          
          scope.funcionSi = function(){
              
              scope.accion();
              elem.modal('hide');
              setTimeout(function(){ elem.remove(); }, 1000);
              
              delete scope.accion;
          };
          scope.funcionNo = function(){
              elem.modal('hide');
              setTimeout(function(){ elem.remove(); }, 1000);
              //;
          };
          
        if(scope.contenido)
            elem.find('.modal-body').append($compile(scope.contenido)(scope));
          
        $("#main-content").append(elem);
        elem.modal('show'); 
      }
    };
}]);


app.directive('noticias',[ function () {
return {
    replace: true,
    restrict: 'E',
    scope: {
        noticias: '='
    },
    template:
            '<div class="noticias">'+
            '<ul class="right-side-accordion">'+
            '<li class="widget-collapsible">'+
                '<a href class="head widget-head purple-bg active" ng-click="verNoticias()">'+
                    '<span class="pull-left"> Noticias ({{noticias.length}})</span>'+
                    '<span class="pull-right widget-collapse"><i class="ico-minus"></i></span>'+
                '</a>'+
                '<ul id="mis-noticias" class="widget-container">'+
                    '<li>'+
                        '<div class="prog-row" ng-repeat="n in noticias">'+
                            '<div class="user-thumb rsn-activity">'+
                                '<i class="fa fa-clock-o"></i>'+
                            '</div>'+
                            '<div class="rsn-details ">'+
                                '<p class="text-muted">{{n.hora}}</p>'+
                                '<p><a >{{n.titulo}}</a>{{n.descripcion}}</p>'+
                            '</div>'+
                        '</div>'+
                    '</li>'+
                '</ul>'+
            '</li>'+
            '</ul>'+
            '</div>',
    link: function(scope,elem,attrs){
          scope.verNoticias = function(){
              $('#mis-noticias').slideToggle('slow');
          };
        $('.widget-container').css({"display":"none"});     
      }
    };
}]);


app.directive('notificaciones',[ function () {
return {
    replace: true,
    restrict: 'E',
    scope: {
        notificaciones: '=',
        funcion: '='
    },
    template:
            '<li id="header_notification_bar" class="dropdown">'+
                '<a data-toggle="dropdown" class="dropdown-toggle" href>'+
                    '<i class="fa fa-bell-o"></i>'+
                    '<span class="badge bg-warning" ng-if="notificaciones.length>0">{{notificaciones.length}}</span>'+
                '</a>'+
                '<ul class="dropdown-menu extended notification">'+
                    '<li>'+
                        '<p>{{notificaciones.length}} alertas pendientes</p>'+
                    '</li>'+
                    '<li ng-repeat="n in notificaciones">'+
                        '<div class="alert clearfix {{n.tipoIcono}}" style="padding:8px">'+
                            '<span class="alert-icon"><i class="fa fa-bolt"></i></span>'+
                            '<div style="padding-left:8px;float:left">'+
                                '<a href ng-click="funcion(n)" style="font-size:16px"> {{n.nombre}}</a>'+
                                '<p style="font-size: 13px;padding:0">{{n.descripcion}}</p>'+
                            '</div>'+
                        '</div>'+
                    '</li>'+
                '</ul>'+
            '</li>',
    link: function(scope,elem,attrs){
           
      }
    };
}]);

app.directive('mensajes',[ function () {
return {
    replace: true,
    restrict: 'E',
    scope: {
        mensajes: '=',
        funcion: '='
    },
    template:
            '<li id="header_inbox_bar" class="dropdown" style="margin-left:0">'+
                '<a data-toggle="dropdown" class="dropdown-toggle" href>'+
                    '<i class="fa fa-envelope-o"></i>'+
                    '<span class="badge bg-important" ng-if="mensajes.length>0">{{mensajes.length}}</span>'+
                '</a>'+
                '<ul class="dropdown-menu extended inbox">'+
                    '<li>'+
                        '<p class="red">Tienes {{mensajes.length}} Mensajes Nuevos <a style="float:none" href="#bandejaMensajes">ver todos</a></p>'+
                    '</li>'+
                    '<li ng-repeat="m in mensajes">'+
                        '<a href ng-click="funcion(m)">'+
                            '<span class="photo"><img alt="avatar" src="recursos/img/avatar1_small.jpg"></span>'+
                                '<span class="subject">'+
                                '<span class="from">{{m.remitente}}</span>'+
                                '<span class="time">{{m.fechaEnvio}}</span>'+
                                '</span>'+
                                '<span class="message">{{m.asunto}}</span>'+
                        '</a>'+
                    '</li>'+
                '</ul>'+
            '</li>',
    link: function(scope,elem,attrs){
           
      }
    };
}]);
/*
app.directive('tablaResponsiva',[ function () {
return {
    link: function(scope,elem,attrs){
        
        //setTimeout(function(){
            var div = angular.element('<div class="tabla-responsiva"></div>');
            elem.replaceWith(div);
            div.append(elem);
        //}, 250);
    }
  };
}]);
*/

/*Componente para subir un archivo*/
app.directive('inputFile',[ function () {
return {
    restrict: 'E',
    scope: {
        archivo: '=',
        nombre: '=',
        nover: '='
    },
    template:
            '<input type="file" class="mi-input" onchange="angular.element(this).scope().cambiarMiArchivo(this)"></input><span ng-if="!nover" style="margin-top: 4px;">{{archivo.name}}</span>'
    ,
    link: function(scope,elem,attrs){
          scope.cambiarMiArchivo = function(input){
            scope.$apply(function () {
                if(input.files[0]){
                    scope.archivo = crearMyFile(input.files[0]);
                    scope.nombre = scope.archivo.name;
                }
                else{
                    scope.archivo = null;
                    scope.nombre = "";
                }
            });
              
              /*input.files[0] = {};//reiniciando el archivo*/
          };
      }
    };
}]);
/*Componente para ver un archivo*/
app.directive('viewFile',[ function () {
return {
    restrict: 'E',
    scope: {
        url: '@',
        nombre: '=',
        archivo: '=',
        nover: '='
    },
    template:
            '<i ng-click="verDocumento()" ng-hide="isVacio()" class="mi-view fa fa-eye"></i><span> {{nover?"":nombre}}</span>'
    ,
    link: function(scope,elem,attrs){
        
        if( scope.archivo instanceof MyFile)
            scope.nombre = scope.archivo.name;
        else if(typeof(scope.archivo) === "string"){
            scope.nombre = scope.archivo;
        }else{
            console.log("nombre archivo "+scope.nombre);
        }
        
        
        scope.verDocumento = function(){
            if( scope.archivo instanceof MyFile )
                verDocumento(scope.archivo.buildDataURL());
            else{
                if(scope.url)
                    verDocumento("/SIGESMED/"+scope.url+scope.nombre);
                else
                    verDocumento("/SIGESMED/"+scope.nombre);
            }
                
        };
        scope.isVacio = function(){
            return scope.nombre==null || scope.nombre==="";
        };
      }
    };
}]);

/*Componente para hacer un progress bar*/
app.directive('progressBar',[ function () {
return {
    restrict: 'E',
    scope: {
        parcial: '=',
        total: '=',
        tipo: '@'
    },
    template:
    '<div class="progress progress-striped">'+
        '<div ng-style="{width: porcentaje>100?100+\'%\':porcentaje+\'%\'}" class="progress-bar" ng-class="{\'progress-bar-success\': estado(),\'progress-bar-warning\': estado2(),\'progress-bar-danger\': estado3()}">'+
            '<span ng-value="porcentaje=parcial/total*100">{{porcentaje>100?(parcial - total)+sim:parcial+sim}}</span>'+
        '</div>'+
        '<div ng-if="porcentaje<100" style="width: auto;line-height:20px" >'+
            '<b>{{(total - parcial)+sim}}</b>'+
        '</div>'+
    '</div>'
    ,
    link: function(scope,elem,attrs){
        
        scope.porcentaje = scope.parcial/scope.total*100;
        scope.sim = "";
        if(scope.tipo===undefined)
            scope.sim ="";
        else if(scope.tipo==="%")
            scope.sim = " %";
        else
            scope.sim = " "+scope.tipo;
            
        scope.estado = function(){
            return scope.porcentaje <70;
        };
        scope.estado2 = function(){
            return scope.porcentaje >=70 && scope.porcentaje < 100;
        };
        scope.estado3 = function(){
            return scope.porcentaje >=100;
        };
    }
};
}]);
/*Componente para hacer un progress bar*/
app.directive('menuPersonalizado',[ function () {
    return {
        restrict: 'E',
        scope: {
            funciones: '=',
            click: '='
        },
        template:
        '<div style="display: flex;padding: 0 5px 5px;max-width: 100%;flex-wrap: wrap;-webkit-flex-wrap: wrap">'+
        '<div ng-repeat="f in funciones" class="miPanel" style="background:{{f.color}} ;padding: 2px;max-width: 150px;width: 150px;margin: 5px auto 0;border-radius: 4px;height: 34px;">'+
            '<a ng-click="click(f,f.menu)" style="display: block;height: 100%;cursor: pointer;color: #fff;">'+
            '<p style="margin: 0;line-height: 15px">{{f.nombre}}</p>'+
            '</a>'+
        '</div>'+
        '</div>'
    };
}]);
app.directive('viewFileIcono',[ function () {
return {
    restrict: 'E',
    scope: {
        url: '@',
        nombre: '=',
        archivo: '='
    },
    template:
    '<i ng-click="verDocumento()" ng-hide="isVacio()" class="mi-view fa fa-eye"></i>'
    ,
    link: function(scope,elem,attrs){
        
        if( scope.archivo instanceof MyFile)
            scope.nombre = scope.archivo.name;
        else if(typeof(scope.archivo) === "string"){
            scope.nombre = scope.archivo;
        }else{
            console.log("nombre archivo "+scope.nombre);
        }
        
        
        scope.verDocumento = function(){
            if( scope.archivo instanceof MyFile )
                verDocumento(scope.archivo.buildDataURL());
            else{
                if(scope.url)
                    verDocumento("/SIGESMED/"+scope.url+scope.nombre);
                else
                    verDocumento("/SIGESMED/"+scope.nombre);
            }
                
        };
        scope.isVacio = function(){
            return scope.nombre==null || scope.nombre==="";
        };
      }
    };
}]);
/*funciones para crear un objeto tipo archivo*/
/*funcion que lee un input file para crear un objecto MyFile*/
function crearMyFile(file){    
    var miArchivo = new MyFile(file.name);
    miArchivo.size=file.size;

    var reader = new FileReader();
    //implementando la funcion onload
    reader.onload = function(){
        miArchivo.parseDataURL(reader.result );
    };

    //leendo la imagen
    reader.readAsDataURL(file);
    
    return miArchivo;
};
//varios archivos
function crearArrayMyFile(files){
    
    var listaArchivos = [];

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
        
        var file = f; //un solo archivo
        var miArchivo = new MyFile(file.name);

        var reader = new FileReader();
        //implementando la funcion onload
        reader.onload = function(){
            miArchivo.parseDataURL(reader.result );
        };

        //leendo la imagen
        reader.readAsDataURL(file);

        listaArchivos.push( miArchivo );
      
    }
    return listaArchivos;
    
};
/**/
app.directive('sectionTable',['$log',function ($log){
    return{
        templateUrl: 'section_table.html',
        restrict:'E',
        replace: true,
        scope:{
            model: '='
        },
        link: function($scope,$element,$attrs){
            initData();
            $scope.current;
            var levels = new Array($scope.model.titles.length - 1);
            function initData(){
                var titles = $scope.model.titles;
                var data = $scope.model.data;
                if(angular.isArray(titles)){
                    var index = 0;
                    angular.forEach(titles,function(value,key){
                        if(!angular.isObject(value)){
                            titles[key] = {id:index++,title:value};
                        }
                    });
                }
            }
            $scope.showSecondLevel = function(data){
                var index = _.findIndex($scope.model.data,function(o){
                    return data.nom === o.nom;
                })
                $scope.current = $scope.model.data[index];
               levels[0]= $scope.nextArray($scope.current);
                //borrar los demas
                for(var i = 1 ; i < levels.length; i++){
                    levels[i] = [];
                }
            }
            $scope.showContent = function(id){
                return levels[id];
            }
            $scope.nextArray = function(data){
                if(angular.isObject(data)){
                    for(var a in data)
                        if(angular.isArray(data[a])) {
                            return data[a];
                        }
                }else
                    return null;
            }
            $scope.showNext = function(data,index){
                if(index < levels.length - 1){
                    levels[index + 1] = $scope.nextArray(data);
                }
                if(data.selec != undefined)
                    data.selec = !data.selec;
                else
                    data.selec = true;
                //$log.log('model data',$scope.model.data);
            }
        }
    }
}]);
/*Componente para subir un archivo*/
app.directive('inputFileCsv',[ function () {
return {
    restrict: 'E',   
    scope: {
        archivo: '=',
        nombre: '=',
        header: '=?',
        verificar: '=?'
            
    },
    template:
            '<input type="file" class="mi-input col-xs-2 col-sm-2" onchange="angular.element(this).scope().cambiarCSV(this)" ></input><div class=" col-xs-10 col-sm-10"><label>{{nombre}}</label></div>'
    ,
    link: function(scope,elem,attrs){
          scope.cambiarCSV = function(input){
              
            scope.$apply(function () {
                if( input.files[0].type.match(/text\/csv/) || input.files[0].type.match(/vnd\.ms-excel/) ){
                        
                scope.nombre = input.files[0].name;
                scope.archivo = upload(input.files[0],scope.header,scope.verificar);                              
            }
            else{
                alert("SELECCIONE UN ARCHIVO CSV");
            }
            });
              
              /*input.files[0] = {};//reiniciando el archivo*/
          };
      }
    };
}]);
           

/*funciones para crear un objeto tipo archivo*/
/*funcion que lee un input file para crear un objecto MyFile*/
function upload(file,flag,datos){   
           
            var json = new MyFileJSON();

            var reader = new FileReader();
            reader.onload = function() {           
            json.parseCSV(reader.result,flag,datos );           
                       
            };            
            reader.readAsText(file,"ISO-8859-1");     
       
    return json;
};