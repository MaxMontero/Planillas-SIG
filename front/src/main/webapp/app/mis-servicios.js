app.factory('crud', ['$http','$rootScope','urls', function($http,$rootScope,urls){
    return{
        insertar: function( urlRest,data,sucess,error ){
            
            $http({
                method: 'POST',
                url: urls.BASE + urlRest,
                headers: {'Content-Type': 'text/plain'},
                data: data
            }).success( sucess ).error( error);            
        },
        listar: function( urlRest,data,sucess,error ){
            
            $http({
                method: 'GET',
                url: urls.BASE + urlRest,
                params:{content:data}
            }).success( sucess ).error( error);            
        },
        actualizar: function( urlRest,data,sucess,error){
            
            $http({
                method: 'PUT',
                url: urls.BASE + urlRest,
                headers: {'Content-Type': 'text/plain'},
                data: data
            }).success( sucess ).error( error);            
        },
        eliminar: function( urlRest,data,sucess,error){
            
            $http({
                method: 'DELETE',
                url: urls.BASE + urlRest,
                params:{content:data}
            }).success( sucess ).error( error);            
        },
        subirArchivo: function(urlRest,file,sucess,error){
            
            var formData = new FormData();
            formData.append("file", file,file.name);
            
            $http({
                method: 'POST',
                url: urls.BASE + urlRest,
                headers: {'Content-Type': undefined,transformRequest: angular.identity},
                data: formData
            }).success( sucess ).error( error);
            
        },
        verificarToken: function(){
            
            $http({
                method: 'HEAD',
                url: urls.BASE +"/login"
            }).success( function(){
                console.log("BIENVENIDO AL SISTEMA");
            }).error( function(data, status, headers, config){
                console.log("ERROR "+status);
            });
        },
        crearRequest: function(componente,version,accion){
                   
            var request = new Request(""+$rootScope.usuMaster.usuario.ID,"web");
            request.setCmd(componente,version,accion);
            return request;
        }
        
    };
}]);

app.factory('modal', ['$compile','$interpolate', function($compile,$interpolate){
    return{
        mensaje: function(titulo,mensaje){
            $.gritter.add({
                // (string | mandatory) the heading of the notification
                title: titulo,
                // (string | mandatory) the text inside the notification
                text: mensaje,
                // (string | optional) the image to display on the left
                //image: 'assets/img/ui-sam.jpg',
                // (bool | optional) if you want it to fade out on its own or just sit there
                sticky: false,
                // (int | optional) the time you want it to be alive for before fading out
                time: '2000',
                // (string | optional) the class name you want to apply to that specific message
                class_name: 'my-sticky-class'
            });
        },
        mensajeConfirmacion: function($scope,mensaje,funcion,width){
            
            if(!width)
                width = '750';//tamaño por default
            
            $scope.miFuncionConfirmacion = funcion;
            $compile('<confirmacion mensaje="'+mensaje+'" accion="miFuncionConfirmacion" contenido width="'+width+'"></confirmacion>')($scope);
            
        },
        mensajeConfirmacion2: function($scope,titulo,funcion,contenido,width){
            
            if(!width)
                width = '750';//tamaño por default
            
            $scope.miFuncionConfirmacion = funcion;
            $compile('<confirmacion titulo="'+titulo+'" mensaje="" accion="miFuncionConfirmacion" contenido="'+contenido+'" width="'+width+'"></confirmacion>')($scope);
            
        }
    };
}]);     

/* Claves del REQUEST*/
KEY_REQUEST_STR = "i.type";
REQUEST_STR = "inet-req";
REQUEST_ID_STR = "cmd";
REQUEST_IDENTITY_STR = "identity";
REQUEST_SCOPE_STR = "scope";
REQUEST_META_STR = "meta";
REQUEST_DATA_STR = "data";

/* Objeto Request */
function Request(identity,scope){

    this[KEY_REQUEST_STR] = REQUEST_STR;
    this[REQUEST_SCOPE_STR] = scope;
    this[REQUEST_IDENTITY_STR] = identity;
    this[REQUEST_META_STR] = new Object();

    this.getCmd = function(){
        return this.mCurrendCommand;
    };
    this.setCmd = function(dominio,version,accion){
        this[REQUEST_ID_STR] = dominio+"@"+version+":"+accion;
    };
    this.getIdentity = function(){
        return this.mIdentity;
    };
    this.setIdentity = function(identity){
        this[REQUEST_IDENTITY_STR] = identity;
    };
    this.getScope = function(){
        return this.mScope;
    };
    this.setScope = function(scope){
        this[REQUEST_SCOPE_STR] = scope;
    };
    this.getData = function(){
        return this.mData;
    };
    this.setData = function(data){
        this[REQUEST_DATA_STR] = data;
    };
    this.getMetadata = function(){
        return this[REQUEST_META_STR];
    };
    this.setMetadataValue = function(key,value){
        if(!(value instanceof Array))
            this[REQUEST_META_STR][key] = [value];
    };    
    this.setMetadataValues = function(key,values){
        if(values instanceof Array)
            this[REQUEST_META_STR][key] = values;
    };
};




/*Funcion que busca dentro de un array*/
function buscarContenido(lista, labelClave, labelContenido, idBuscado){
    for(var i=0;i<lista.length;i++ ){
        if(lista[i][labelClave] === idBuscado)
            return lista[i][labelContenido];
    }
};
function buscarObjeto(lista, labelClave,idBuscado){
    if(!lista)
        return null;
    for(var i=0;i<lista.length;i++ ){
        if(lista[i][labelClave] === idBuscado)
            return lista[i];
    }
};
function buscarObjetos(lista, labelClave,idBuscado){
    if(!lista)
        return null;
    var objetos = [];
    for(var i=0;i<lista.length;i++ ){
        if(lista[i][labelClave] === idBuscado)
            objetos.push(lista[i]);
    }
    return objetos;
};
//busca objetos diferentes
function buscarObjetosD(lista, labelClave,idBuscado){
    if(!lista)
        return null;
    var objetos = [];
    for(var i=0;i<lista.length;i++ ){
        if(lista[i][labelClave] != idBuscado)
            objetos.push(lista[i]);
    }
    return objetos;
};
//eliminar objeto de una lista
function eliminarObjeto(lista, labelClave,idBuscado){
    if(!lista)
        return;
    for(var i=0;i<lista.length;i++ ){
        if(lista[i][labelClave] === idBuscado){
            lista.splice( i ,1);
            return;
        }
    }
};
/*Funcion que copia un objeto atributo por atributo*/
function copiar(objCopia , objOriginal){
    for (var i in objOriginal) {
        if (objOriginal.hasOwnProperty(i) )
            objCopia[i] = objOriginal[i];
    }
};

/*el atributo ->i<- esta reservado para indicar la posicion del elemento en el array*/
/*Funcion que añade la posicion a los elementos de un array*/
function iniciarPosiciones(miArray){
    miArray.forEach(function(item,index){
        item.i = index;
    });
};
/*Funcion que inserta elemento en la posicion final*/
function insertarElemento(miArray, elemento){
    elemento.i = miArray.length;
    miArray.push(elemento);
};

/*Funcion que elimina un elemento de un array y reinicia las posiciones de las elementos restantes*/
function eliminarElemento(miArray, posElemento){
    //eliminando elemento
    miArray.splice( posElemento ,1);
    //reiniciando las posiciones de los elementos restantes al eliminado
    for (var i = posElemento,l = miArray.length; i < l; i++)
        miArray[i].i = i;
};
/*Funcion que convierte al formato de feccha YYYY-MM-DD*/
function convertirFecha(fecha){
    
    if( !fecha )
        return "";
    
    var dia = fecha.getDate();
    var mes = fecha.getMonth();
    var año = fecha.getFullYear();
    
    if(!dia || !año)
        return "";
    
    return dia+"/"+(mes+1)+"/"+año;
};
function convertirFecha2(fecha){
    
    if( !fecha )
        return "";
    
    var dia = fecha.getDate()>9?fecha.getDate():'0'+fecha.getDate();
    var mes = fecha.getMonth()>8?fecha.getMonth()+1:'0'+(fecha.getMonth()+1);
    var año = fecha.getFullYear();
    
    if(!dia || !año)
        return "";
    
    return año+"-"+mes+"-"+dia;
};
function convertirFecha3(fecha){
    
    if( !fecha )
        return "";
    
    var dia = fecha.getDate()>9?fecha.getDate():'0'+fecha.getDate();
    var mes = fecha.getMonth()>8?fecha.getMonth()+1:'0'+(fecha.getMonth()+1);
    var año = fecha.getFullYear();
    
    if(!dia || !año)
        return "";
    
    return dia+"/"+mes+"/"+año;
};

//formato de hora(no importa el año mes y dia)
function convertirHora(fecha){
    
    if( !fecha )
        return "";
    
    var hora = fecha.getHours()>9?fecha.getHours():'0'+fecha.getHours();
    var minuto = fecha.getMinutes()>9?fecha.getMinutes():'0'+fecha.getMinutes();
    var segundo = fecha.getSeconds()>9?fecha.getSeconds():'0'+fecha.getSeconds();
    
    //dd/M/yyyy HH:mm:ss
    return hora+":"+minuto+":"+segundo;
};
function convertirFechaUTC(fecha){
    
    if( !fecha )
        return "";
    
    var dia = fecha.getUTCDate()>9?fecha.getUTCDate():'0'+fecha.getUTCDate();
    var mes = fecha.getUTCMonth()>8?fecha.getUTCMonth()+1:'0'+(fecha.getUTCMonth()+1);
    var año = fecha.getUTCFullYear();
    
    var hora = fecha.getUTCHours()>9?fecha.getUTCHours():'0'+fecha.getUTCHours();
    var minuto = fecha.getUTCMinutes()>9?fecha.getUTCMinutes():'0'+fecha.getUTCMinutes();
    var segundo = fecha.getUTCSeconds()>9?fecha.getUTCSeconds():'0'+fecha.getUTCSeconds();
    
    if(!dia || !año)
        return "";
    
    return año+"-"+mes+"-"+dia+" "+hora+":"+minuto+":"+segundo;
};
function verDocumento(archivo){
  window.open(archivo,"ventana1","addressbar=NO,directories=NO, location=NO, menubar=NO, scrollbars=NO, statusbar=NO,status=NO,menubar=NO,toolbar=NO, tittlebar=no,width=500,height=400");  
};


/*objeto que contiene informacion acerca de nuestro archivo*/
function MyFile(nombre){
    this.name = nombre; //nombre del archivo con su extension
    this.type;          //tipo de archivo (ej application, image etc)    
    this.codeType;      //tipo codificacion del contenido (ej base64, base32, etc)
    this.data;          //contenido del archivo
    this.size;          //tamaño del archivo
        
    //trabajamos sobre el dataURL --> "data:application/pdf;base64,datossss"  "data:image/png;base64,datosss"
    this.parseDataURL = function(dataURL){
        var dataURLSeparado = dataURL.split(",");
        
        //obtenemos los datos
        this.data = dataURLSeparado[1];
        //la primera parte es la cabecera del archivo
        var cabecera = dataURLSeparado[0].split(";");       
        
        //obtenemos el typo de codificacion
        this.codeType = cabecera[1];
        //obtenemos el tipo de archivo
        this.type = cabecera[0].split(":")[1];
        this.size = Math.round((this.data.length)*3/4) ;
    };
    this.buildDataURL = function(){
        return "data:"+this.type+";"+this.codeType+","+this.data;
    };
};

function crearGraficoBarras(idCanvas,labels,miData){
    
    var backgroundColor = [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ];
    var borderColor = [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'];            
    
    var dataSet = [];    
    miData.forEach(function (item,i){
        if(item.data.length != labels.length){
            alert("ERROR los datos no coinciden con las etiquetas");
            return;
        }
            
        var data = {label: item.nombre , data: item.data,backgroundColor: backgroundColor[i],borderColor: borderColor[i],borderWidth: 1};
        dataSet.push(data);
    });

    var ctx = document.getElementById(idCanvas);
    var padre = ctx.parentNode;
    padre.innerHTML = "";
    
    //haciendo una copia de los atributos del canvas
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id",ctx.getAttribute("id"));
    canvas.setAttribute("height",ctx.getAttribute("height"));
    canvas.setAttribute("width",ctx.getAttribute("width"));
    
    //añadiendo el nuevo canvas
    padre.appendChild(canvas);
    return new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: dataSet
        },
        options: {
            responsive: false,
            scales: {yAxes: [{ticks: {beginAtZero:true}}]}
        }
    });
    
};

function crearGraficoDona(idCanvas,labels,miData){
    
    var backgroundColor= [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#9C27B0",
                "#00897B",
                "#4FC3F7",
                "#CDDC39",
                "#FFC107",
                "#8D6E63",
                "#90A4AE",
                "#FFF9C4",
                "#00C853",
                "#FF1744",
                "#5C6BC0",
                "#006064"
            ];
    var color =[];
    miData.forEach(function(item,i){
        color.push(backgroundColor[i]);
    });
    
    var dataSet = [{ data: miData,backgroundColor:color,hoverBackgroundColor:color}];

    var ctx = document.getElementById(idCanvas);
    var padre = ctx.parentNode;
    padre.innerHTML = "";
    
    //haciendo una copia de los atributos del canvas
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id",ctx.getAttribute("id"));
    canvas.setAttribute("height",ctx.getAttribute("height"));
    canvas.setAttribute("width",ctx.getAttribute("width"));
    
    //añadiendo el nuevo canvas
    padre.appendChild(canvas);
    return new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: dataSet
        },
        options: {
            responsive: false,
            scales: {yAxes: [{ticks: {beginAtZero:true}}]},
            legend: {
                display: true
            }
        }
    });  
};
function rnd(a,b){
    return Math.floor((Math.random() * (b-a)) + a);
};


function randomRGBa(m){    
    return 'rgba('+rnd(5,240)+','+rnd(5,240)+','+rnd(5,240)+','+m+')';    
};

function objSize(a){
    var count = 0;
    var i;

    for (i in a) {
        if (a.hasOwnProperty(i)) {
            count++;
        }
    }
    return count;
};

function crearGraficoBarras2(idCanvas,titulo,miData){
    
    var backgroundColor = [];
    for(var i=0;i<objSize(miData);++i){
        backgroundColor.push(randomRGBa(0.2));
    }
    
    var borderColor = [];
    for(var i=0;i<objSize(miData);++i){
        borderColor.push(randomRGBa(1));
    }
                
    var labels = [];
    var values = [];
    
    miData.forEach(function (item,i){            
        labels.push(item.nombre);
        values.push(item.data);
    });
    var ctx = document.getElementById(idCanvas);
    var padre = ctx.parentNode;
    padre.innerHTML = "";
    
    //haciendo una copia de los atributos del canvas
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id",ctx.getAttribute("id"));
    canvas.setAttribute("height",ctx.getAttribute("height"));
    canvas.setAttribute("width",ctx.getAttribute("width"));
    
    //añadiendo el nuevo canvas
    padre.appendChild(canvas);
    return new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: titulo,
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: 1,
                    data: values
                }                
            ]
        },
        options: {
            responsive: false,
            scales: {yAxes: [{ticks: {beginAtZero:true}}]}
        }
    });
    
};

function crearGraficoPie(idCanvas,miData){
    
    var backgroundColor = [];
    for(var i=0;i<objSize(miData);++i){
        backgroundColor.push(randomRGBa(0.2));
    }
                    
    var labels = [];
    var values = [];
    
    miData.forEach(function (item,i){            
        labels.push(item.nombre);
        values.push(item.data);
    });
    var ctx = document.getElementById(idCanvas);
    var padre = ctx.parentNode;
    padre.innerHTML = "";
    
    //haciendo una copia de los atributos del canvas
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id",ctx.getAttribute("id"));
    canvas.setAttribute("height",ctx.getAttribute("height"));
    canvas.setAttribute("width",ctx.getAttribute("width"));
    
    //añadiendo el nuevo canvas
    padre.appendChild(canvas);
    
    return new Chart(canvas, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [
                {                    
                    backgroundColor: backgroundColor,
                    hoverBackgroundColor: backgroundColor,                    
                    data: values
                }                
            ]
        },
        options: {
            responsive: false,            
        }
    });
};


function iniciarPosicionesYSumar(miArray,saldoApe){
 var saldos={ingresos:0.00 ,egresos:0.00,saldo:0.00};
     var saldoA=saldoApe; 
      miArray.forEach(function(item,index){
        item.i = index;
        item.fecha=new Date(item.fecha.y,item.fecha.m,item.fecha.d);
        item.fechaString=item.fecha.toString() ;
        if(item.libro==='V'){
            
            saldos.ingresos+=parseFloat(item.haber.importe);
        }
        else{
            saldos.egresos+=parseFloat(item.debe.importe);
        }
            
    });
            
      saldos.ingresos= parseFloat(saldos.ingresos) + parseFloat(saldoA);
      saldos.ingresos=saldos.ingresos.toFixed(2);
      saldos.egresos=saldos.egresos.toFixed(2);
      saldos.saldo= saldos.ingresos - saldos.egresos;
     
      
      saldos.saldo=saldos.saldo.toFixed(2);
    return saldos;
};

///Funciones para un servicio adicional
function UtilAppServices($uibModal,$mdDialog) {
    this.openModal = function(nameHtml,nameCtrl,size,alias,params){
        var modalInstance = $uibModal.open({
            animation:true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            keyboard:true,
            backdrop:true,
            templateUrl: nameHtml,
            controller: nameCtrl,
            controllerAs:alias,
            size: size,
            resolve:params
        });
        return modalInstance;
    };
    this.openDialog = function (title,content,ev,succ,err) {
        var confirm = $mdDialog.confirm()
            .title(title)
            .textContent(content)
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Aceptar')
            .cancel('Cancelar');
        $mdDialog.show(confirm).then(succ,err);
    };
};
app.service('UtilAppServices',['$uibModal','$mdDialog',UtilAppServices]);

/*objeto que contiene informacion acerca de nuestro archivo*/
function MyFileJSON(){
               
    this.result=[];   
    this.header=[];
    this.success= true;
    this.errorHeader="";
    this.errorResult=[];
    
    this.parseCSV= function(csv,flag,datos){   
    
    var archivo = csv.replace(/\r\n|\r/g,'\n');
    
    var lines=archivo.split(new RegExp('\n(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));

    var resultJSON = [];      
    var start = 0;
    var columnCount = lines[0].split(",").length;
    
    var headers = [];
    var error=[];
    if (flag) {
        headers=lines[0].split(",");
        start = 1;
        var resptH=verificarHeader(datos,headers);
        if(!resptH.flag){
            this.success = false;
            this.errorHeader = resptH.error;
            flag = false;
        }
    }
    
   // lines[0]=lines[0].substr(0,lines[0].length-1);                    
   // this.header=lines[0].split(",");;
   
    
    for(var i=start;i<lines.length;i++){  
            var obj = {};
            var respt={};
            var currentline=lines[i].split(new RegExp(","+'(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)'));            
          //  currentline=currentline.split(",");
         if ( currentline.length === columnCount ) {
                if (flag) {
                        for (var j=0; j<headers.length; j++) {
                                obj[headers[j]] = currentline[j];
                                respt=verificarContenido(datos[headers[j]],obj[headers[j]]);
                                if(!respt.flag){                                    
                                    error.push("Fila:"+i+" "+"Columna:"+ parseFloat(j+1)+" ; "+ respt.error+" ### ");
                                }
                        }
                } else {
                        for (var k=0; k<currentline.length; k++) {
                                obj[k] = currentline[k];
                        }
                }
                resultJSON.push(obj);
        }                                                                                                  
                                   
    }
 
    this.result = resultJSON;
    this.header = headers; 
    if(error.length>0){
        this.success=false;
        this.errorResult=error;
    }
    };
    
};

function verificarHeader(o1,o2){
    var i=0;
   var respt={flag:true,error:""};
    for(var a in o1){
        if(a!==o2[i]){
             respt.flag = false;
             respt.error= "ENCABEZADOS DIFERENTES: "+o2[i] +" Deberia ser "+a ;
            return respt;
        }
        else {i++;}
    }    
    return respt;
}

function verificarContenido(propiedad,valor){
    var respt={flag:true,error:""};
    var campoO=propiedad.substr(propiedad.length-1,propiedad.length);
    if(campoO=='O'){
        propiedad =propiedad.substr(0,propiedad.length-1);
        if(valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
        respt.flag = false;
        respt.error= "CAMPO OBLIGATORIO, tipo: "+ propiedad;
        return respt;
        }
       
    }
    
    respt.flag = false;
    respt.error= "NO ES: "+ propiedad;
    
    switch(propiedad)   {
        
        case "numero":  if( isNaN(valor) ) {                            
                            return respt;
                        }  
                    break;
        case "fecha":  
                        var day = valor.substr(0,2);
                        var month = valor.substr(3,2);
                        var year = valor.substr(6,4);
    
                        fecha= new Date(year,month-1,day);
                        if( !isNaN(valor) || fecha.toString() === 'Invalid Date'? true: false) {
                            return respt;
                         }
                     break;
        
    }
    
    var respt={flag:true,error:""};
    return respt;
};

//stringToDate("17/9/2014","dd/MM/yyyy","/");
//stringToDate("9/17/2014","mm/dd/yyyy","/")
//stringToDate("9-17-2014","mm-dd-yyyy","-")
function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
};

app.factory('SectionTableParams', ['$log', function($log){
    var SectionTableParams = function(title, data){
        this.titles = title;
        this.data = data;
        var selectedData = new Array();
        this.getTitles = function(){
            return this.titles;
        }
        this.getData = function(){
            return this.data;
        }
        this.getSelectedData = function(){
            angular.forEach(this.data,function(value,key){
                var auxObj = value;
                iterateRecursiveArray(auxObj);
            });

            return selectedData;

        }
        function iterateRecursiveArray(obj){
            while(hasArray(obj)){

                var arr = getArray(obj);
                var parent = {id:obj.id,nom:obj.nom}
                for(var i = 0; i < arr.length; i++){
                    obj = arr[i];
                    if(angular.isObject(obj)){
                        if(obj.selec != undefined && obj.selec == true){
                            obj.parent = parent;
                            selectedData.push(obj);
                        }
                        iterateRecursiveArray(obj);
                    }
                }
            }
        }

        function getArray(obj){
            if(angular.isObject(obj)){
                for(var a in obj)
                    if(angular.isArray(obj[a])) {
                        return obj[a];
                    }
            }else
                return null;
        }
        function hasArray(obj){
            if(angular.isObject(obj)){
                for( var a in obj){
                    if(angular.isArray(obj[a])) return true;
                }
            }return false;
        }
    }

    return SectionTableParams;
}]);
