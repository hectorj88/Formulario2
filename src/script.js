var $botonGuardar = document.querySelector("#guardar");
var modal = document.getElementById('myModal');
var opcion1Button = document.getElementById('opcion1');
var opcion2Button = document.getElementById('opcion2');
var opcion3Button = document.getElementById('opcion3');
var opcion4Button = document.getElementById('opcion4');

var $pedido = document.querySelector("#pedido");
var $fecha = document.querySelector("#fecha");
var $cuenta = document.querySelector("#cuenta");

var $nombre1 = document.querySelector("#nombre");
var $apellido = document.querySelector("#apellido");
var $direccion = document.querySelector("#direccion");
var $telefono = document.querySelector("#celular");
var $barrio = document.querySelector("#barrio");

var $empresa = document.querySelector("#empresa");
var $telefono2 = document.querySelector("#telefonoEmp");
var $direccion2 = document.querySelector("#dirEmpr");

var $cargo = document.querySelector("#cargo");
var $antiguo = document.querySelector("#antiguedad");
var $sueldo = document.querySelector("#sueldo");

var $email = document.querySelector("#email");
var $fCobro = document.querySelector("#fCobro");

var $nNino = document.querySelector("#nino");
var $ciudad = document.querySelector("#ciudad");

var $cNomb = document.querySelector("#nombCo");
var $cApell = document.querySelector("#apellCo");
var $cEmpresa = document.querySelector("#empCo");
var $ctele = document.querySelector("#telCo");
var $cDir = document.querySelector("#direCo");

var $cCargo = document.querySelector("#cargoCo");
var $cAntig = document.querySelector("#antiCo");
var $cSueldo = document.querySelector("#suelCo");

var $rNomb1 = document.querySelector("#nombR1");
var $rp1 = document.querySelector("#ptco1");
var $rTele1 = document.querySelector("#telOR1");
var $rTeleres1 = document.querySelector("#telRR1");

var $rNomb2 = document.querySelector("#nombR3");
var $rp2 = document.querySelector("#ptco2");
var $rTele2 = document.querySelector("#telOR2");
var $rTeleres2 = document.querySelector("#telRR2");

var $rNomb3 = document.querySelector("#nombR3");
var $rp3 = document.querySelector("#ptco3");
var $rTele3 = document.querySelector("#telOR3");
var $rTeleres3 = document.querySelector("#telRR3");

var $rNomb4 = document.querySelector("#nombR4");
var $rp4 = document.querySelector("#ptco4");
var $rTele4 = document.querySelector("#telOR4");
var $rTeleres4 = document.querySelector("#telRR4");

var $oCuotas = document.querySelector("#nCoutas");
var $oValor = document.querySelector("#vrCuota");

var $cedula1 = document.querySelector("#cedula1");
var $cc1 = document.querySelector("#cc1");
var $ce1 = document.querySelector("#ce1");

var $relacionista = document.querySelector("#tomaCont");
var $colaborador = document.querySelector("#especialista");
var $director = document.querySelector("#director");
var $organizador = document.querySelector("#telCliente");

var $cedula2 = document.querySelector("#cedula2");
var $cc2 = document.querySelector("#cc2");
var $ce2 = document.querySelector("#ce2");

var $cedula3 = document.querySelector("#cedula3");
var $cedula4 = document.querySelector("#cedula4");
let $inputs = document.querySelector(".inputs");
const formulario = document.getElementById(".formulario");

var $imgcedula1 = document.querySelector("#imgfile");
var $imgcedula2 = document.querySelector("#imgfile2");
var $imgpago = document.querySelector("#pagofile");


function ejecFunc(){
    /*if(validarCampos()===true){
        resaltarCampos();
        guardarPdf();
        enviarFormulario();
    }else{
        alert("Debes llenar todos los campos requeridos")
        resaltarCampos();
    }*/
}
$botonGuardar.onclick = ejecFunc;

async function guardarPdf(){
    
    $botonGuardar.style.background = "#CFE6F9";
    $botonGuardar.style.color = "#CFE6F9";
    $botonGuardar.style.visibility = "hidden";
    $imgcedula1.style.visibility = "hidden";
    $imgcedula2.style.visibility = "hidden";
    $imgpago.style.visibility = "hidden";

    window.print();
    
    $botonGuardar.style.background = "gray";
    $botonGuardar.style.color = "white";
    $botonGuardar.style.visibility = "visible";
    $imgcedula1.style.visibility = "visible";
    $imgcedula2.style.visibility = "visible";
    $imgpago.style.visibility = "visible";
}

function enviarFormulario(){
    /*$botonGuardar.addEventListener("click", () => {
        alert("prueba");
    })*/

    fetch('https://sheet.best/api/sheets/2a78aa3b-bb70-4d14-bddc-0fed465394da',{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "pedido": $pedido.value,
            "fecha": $fecha.value,
            "cuenta": $cuenta.value,
            "nombre1": $nombre1.value,
            "apellido": $apellido.value,
            "direccion": $direccion.value,
            "telefono": $telefono.value,
            "barrio": $barrio.value,
            "empresa": $empresa.value,
            "telefono2": $telefono2.value,
            "direccion2": $direccion2.value,
            "cargo": $cargo.value,
            "antiguo": $antiguo.value,
            "sueldo": $sueldo.value,
            "email": $email.value,
            "fCobro": $fCobro.value,
            "nNino": $nNino.value,
            "ciudad": $ciudad.value,
            "cNomb": $cNomb.value,
            "cApell": $cApell.value,
            "cEmpresa": $cEmpresa.value,
            "cTele": $ctele.value,
            "cDir": $cDir.value,
            "cCargo": $cCargo.value,
            "cAntig": $cAntig.value,
            "cSueldo": $cSueldo.value,
            "rNomb1": $rNomb1.value,
            "r-p-1": $rp1.value,
            "rTele1": $rTele1.value,
            "rTele-res1": $rTeleres1.value,
            "rNomb2": $rNomb2.value,
            "r-p-2": $rp2.value,
            "rTele2": $rTele2.value,
            "rTele-res2": $rTeleres2.value,
            "rNomb3": $rNomb3.value,
            "r-p-3": $rp3.value,
            "rTele3": $rTele3.value,
            "rTele-res3": $rTeleres3.value,
            "rNomb4": $rNomb4.value,
            "r-p-4": $rp4.value,
            "rTele4": $rTele4.value,
            "rTele-res4": $rTeleres4.value,
            "oCuotas": $oCuotas.value,
            "oValor": $oValor.value,
            "cedula1": $cedula1.value,
            "cc1": $cc1.value,
            "ce1": $ce1.value,
            "relacionista": $relacionista.value,
            "colaborador": $colaborador.value,
            "director": $director.value,
            "organizador": $organizador.value,
            "cedula2": $cedula2.value,
            "cc2": $cc2.value,
            "ce2": $ce2.value,
            "cedula3": $cedula3.value,
            "cedula4": $cedula4.value,                       
        })
    });
}

function validarCampos(){
    if($nombre1.value.length === 0 || $apellido.value.length === 0 || $direccion.value.length === 0 || $telefono.value.length === 0 || $email.value.length === 0 || $ciudad.value.length === 0 || $cedula1.value.length === 0 || $relacionista.value.length === 0 || $colaborador.value.length === 0){
        return false;
    }else{
        $pedido.value = (parseInt(pedidos[pedidos.length - 1].pedido)+1);
        return true;
    }
}

async function resaltarCampos(){
    /*if($pedido.value.length === 0){
        $pedido.style.background = "rgb(255, 209, 209)";
    }else{
        $pedido.style.background = "transparent";
    }*/

    if($nombre1.value.length === 0){
        $nombre1.style.background = "rgb(255, 209, 209)";
    }else{
        $nombre1.style.background = "transparent";
    }

    if($apellido.value.length === 0){
        $apellido.style.background = "rgb(255, 209, 209)";
    }else{
        $apellido.style.background = "transparent";
    }

    if($direccion.value.length === 0){
        $direccion.style.background = "rgb(255, 209, 209)";
    }else{
        $direccion.style.background = "transparent";
    }

    if($telefono.value.length === 0){
        $telefono.style.background = "rgb(255, 209, 209)";
    }else{
        $telefono.style.background = "transparent";
    }

    if($email.value.length === 0){
        $email.style.background = "rgb(255, 209, 209)";
    }else{
        $email.style.background = "transparent";
    }

    if($ciudad.value.length === 0){
        $ciudad.style.background = "rgb(255, 209, 209)";
    }else{
        $ciudad.style.background = "transparent";
    }

    if($cedula1.value.length === 0){
        $cedula1.style.background = "rgb(255, 209, 209)";
    }else{
        $cedula1.style.background = "white";
    }

    if($relacionista.value.length === 0){
        $relacionista.style.background = "rgb(255, 209, 209)";
    }else{
        $relacionista.style.background = "transparent";
    }

    if($colaborador.value.length === 0){
        $colaborador.style.background = "rgb(255, 209, 209)";
    }else{
        $colaborador.style.background = "transparent";
    }
}

$imgcedula1.addEventListener('change', ()=>{
    let imgfile1 = $imgcedula1.files[0];
    let imgfileURL1 = URL.createObjectURL(imgfile1);
    document.querySelector("#visual1").setAttribute('src',imgfileURL1);
})

$imgcedula2.addEventListener('change', ()=>{
    let imgfile2 = $imgcedula2.files[0];
    let imgfileURL2 = URL.createObjectURL(imgfile2);
    document.querySelector("#visual2").setAttribute('src',imgfileURL2);
})

$imgpago.addEventListener('change', ()=>{
    let pago = $imgpago.files[0];
    let pagoURL2 = URL.createObjectURL(pago);
    document.querySelector("#pago1").setAttribute('src',pagoURL2);
})


// Mostrar el modal al hacer clic en el botón "Guardar"
$botonGuardar.addEventListener('click', function() {
    modal.style.display = 'block';
});


opcion1Button.addEventListener('click', function() {
    modal.style.display = 'none';
    handleAuthClick();
});

opcion2Button.addEventListener('click', function(event) {
    modal.style.display = 'none';
    // Realizar acciones relacionadas con la Opción Nuevo Pedido
    if (validarCampos() === true) {
        resaltarCampos();
        nuevoPedido();
        guardarPdf();
        event.preventDefault(); // Evitar la recarga de la página
    } else {
        alert("Debes llenar todos los campos requeridos")
        resaltarCampos();
    }
});

opcion3Button.addEventListener('click', function(event) {
    buscarPedido();
    modal.style.display = 'none';
    event.preventDefault(); // Evitar la recarga de la página
    // Realizar acciones relacionadas con la Opción Buscar Pedido
});

opcion4Button.addEventListener('click', function (event) {
    modal.style.display = 'none';
    editPedidos();
    event.preventDefault(); // Evitar la recarga de la página
    // Realizar acciones relacionadas con la Opción Actualizar Pedido
});

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


window.onload = function() {
    modal.style.display = 'block'
};


// Obtener el agente de usuario del navegador
const userAgent = navigator.userAgent;

// Verificar si el agente de usuario contiene cadenas típicas de dispositivos móviles
const isMobile = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

if (isMobile) {
    // El usuario está en un dispositivo móvil
    alert("El usuario está en un dispositivo móvil");
    console.log("El usuario está en un dispositivo móvil");
} else {
    // El usuario está en una computadora
    console.log("El usuario está en una computadora");
}

// Función para verificar si se trata de un dispositivo móvil
function isMobileDevice() {
    // Obtener el ancho de la ventana del navegador
    const windowWidth = window.innerWidth;
    // Definir un umbral (por ejemplo, 768 píxeles) que determine si se considera un dispositivo móvil
    const mobileThreshold = 768;
    return windowWidth < mobileThreshold;
}

