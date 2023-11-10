
// TODO(developer): Establezca el ID de cliente y la clave API desde la consola de desarrollador
const CLIENT_ID = '463066749424-rgk5td66egs5vn23r5jibabadq2rsdjf.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB6sN1ePSrsktbVmqju-K3Ry--VQ-rZ0Mg';

// Discovery doc URL para las API utilizadas por el quickstart
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Ámbitos de autorización requeridos por la API; se pueden incluir
// varios ámbitos, separados por espacios.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

// Constante para definir el nombre de la cookie donde se almacenará el token de acceso
const ACCESS_TOKEN_COOKIE_KEY = 'access_token';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById("gapi").addEventListener("load",gapiLoaded());
document.getElementById("gis").addEventListener("load",gisLoaded());


let isUserAuthenticated = false; // Variable para rastrear el estado de autenticación

// La función onSignIn se llama cuando el usuario inicia sesión con Google
function onSignIn(googleUser) {
    isUserAuthenticated = true;
    
    // Obtener el token de acceso del usuario que inició sesión
    const accessToken = googleUser.getAuthResponse().access_token;

    // Guardar el token de acceso en una cookie
    saveAccessTokenCookie(accessToken);
}

// Función para guardar el token de acceso en una cookie
function saveAccessTokenCookie(accessToken) {
    // Utilizar la biblioteca js-cookie para establecer la cookie
    Cookies.set(ACCESS_TOKEN_COOKIE_KEY, accessToken, { expires: 15 }); // Configura la expiración según tus necesidades
}

// Función para obtener el token de acceso almacenado en la cookie
function getSavedAccessTokenCookie() {
    return Cookies.get(ACCESS_TOKEN_COOKIE_KEY);
}

/*
document.getElementById('authorize_button').style.visibility = 'hidden';
document.getElementById('signout_button').style.visibility = 'hidden';*/

/**
 * Callback después de cargar api.js.
 */
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

/**
 * Callback después de cargar el cliente API.
 * Carga el documento de descubrimiento para inicializar la API.
 */ 
async function initializeGapiClient() {

    // Obtener el token de acceso almacenado en la cookie
    const savedAccessToken = getSavedAccessTokenCookie();

    // Si hay un token almacenado, establecerlo en el cliente GAPI
    if (savedAccessToken) {
        gapi.client.setToken({ access_token: savedAccessToken });
    }

    // Inicializar el cliente GAPI con la clave API y la documentación de descubrimiento
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });

    // Marcar que GAPI ha sido inicializado
    gapiInited = true;

    // Llamar a la función gapiLoaded para continuar con el flujo de carga
    gapiLoaded();
}

/**
 * Devolución de llamada una vez cargados los Servicios de identidad de Google.
 */
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    //maybeEnableButtons();
}

/**
 * Permite la interacción del usuario una vez cargadas todas las bibliotecas.


function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
    }
} */

/**
 *  Registrar al usuario al pulsar el botón.
 */
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }        
        //document.getElementById('signout_button').style.visibility = 'visible';
        //document.getElementById('authorize_button').innerText = 'Refresh';

        // Si se obtiene el token correctamente, llamar a la función getPedidos
        await getPedidos();
    };

    // Verificar si ya hay un token almacenado
    if (gapi.client.getToken() === null) {
        // Si no hay un token, solicitar uno (con el consentimiento del usuario)
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Si ya hay un token, solicitar uno sin mostrar el cuadro de diálogo
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('content').innerText = '';
        document.getElementById('authorize_button').innerText = 'Authorize';
        //document.getElementById('signout_button').style.visibility = 'hidden';
    }
}


// Agrega un evento al documento para iniciar sesión al cargar la página.
document.addEventListener('DOMContentLoaded', () => {

        // Obtener el token de acceso almacenado en la cookie
        const savedAccessToken = getSavedAccessTokenCookie();

        // Si hay un token almacenado, establecerlo en el cliente GAPI
        if (savedAccessToken) {
            gapi.client.setToken({ access_token: savedAccessToken });
        }
    
        // Llamar a la función handleAuthClick para manejar la autenticación
        handleAuthClick();
});