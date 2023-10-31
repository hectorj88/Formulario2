/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// TODO(developer): Establezca el ID de cliente y la clave API desde la consola de desarrollador
const CLIENT_ID = '463066749424-rgk5td66egs5vn23r5jibabadq2rsdjf.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB6sN1ePSrsktbVmqju-K3Ry--VQ-rZ0Mg';

// Discovery doc URL para las API utilizadas por el quickstart
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Ámbitos de autorización requeridos por la API; se pueden incluir
// varios ámbitos, separados por espacios.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById("gapi").addEventListener("load",gapiLoaded());
document.getElementById("gis").addEventListener("load",gisLoaded());

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
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
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
        /*
        document.getElementById('signout_button').style.visibility = 'visible';
        document.getElementById('authorize_button').innerText = 'Refresh';
        */
        await getPedidos();
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
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
        document.getElementById('signout_button').style.visibility = 'hidden';
    }
}


// Agrega un evento al documento para iniciar sesión al cargar la página.
document.addEventListener('DOMContentLoaded', () => {
    handleAuthClick();
});