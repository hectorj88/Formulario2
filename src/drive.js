// Importa la biblioteca de la API de Google Drive y OAuth 2.0
let carpeta1;
let carpeta2;
let carpeta3;
//import { gapi } from 'gapi-client';  // Importa las bibliotecas necesarias. Asegúrate de que estos nombres de módulos coincidan con tu entorno.

//import { handleAuthClick } from './auth'; // Asegúrate de importar la función de autenticación desde tu archivo auth.js

// Función para guardar un archivo en Google Drive en una carpeta específica
async function guardarImagen(carpetaId, nombreImagen, contenidoImagen) {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) { // Verifica si el usuario ya está autenticado
        const drive = gapi.client.drive;

        // Crea un objeto de metadatos del archivo
        const fileMetadata = {
            name: nombreImagen,   // Nombre del archivo en Google Drive
            parents: [carpetaId], // ID de la carpeta en la que se guardará
        };

        // Crea un objeto Blob con el contenido del archivo
        const blob = new Blob([contenidoImagen], { type: 'image/jpeg' });

        // Crea un flujo de medios (media) a partir del Blob
        const media = new MediaStream(blob);

        try {
            // Intenta crear el archivo en Google Drive
            const response = await drive.files.create({
                resource: fileMetadata,
                media: media, // Contenido del archivo
                fields: 'id',  // Campos que se deben devolver en la respuesta
            });

            console.log(`Archivo creado con ID: ${response.result.id}`);
        } catch (error) {
            console.error('Error al crear el archivo:', error);
        }
    } else {
        // Si el usuario no está autenticado, solicita la autenticación
        handleAuthClick();
    }
}

// Función para buscar un archivo en una carpeta específica de Google Drive y mostrarlo en el elemento HTML correspondiente
async function encontrarImagen(carpetaId, nombreImagen, campoImagenId) {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) { // Verifica si el usuario ya está autenticado
        const drive = gapi.client.drive;

        try {
            // Busca el archivo en Google Drive
            const response = await drive.files.list({
                q: `'${carpetaId}' in parents and name = '${nombreImagen}'`, // Consulta para buscar el archivo
            });

            const files = response.result.files;
            if (files.length > 0) {
                // Se encontró el archivo, muestra su contenido en el elemento HTML
                const fileId = files[0].id;
                const file = await drive.files.get({ fileId, alt: 'media' });
                document.getElementById(campoImagenId).src = URL.createObjectURL(file.body);
            } else {
                console.error('El archivo no se encontró en la carpeta.');
            }
        } catch (error) {
            console.error('Error al buscar el archivo:', error);
        }
    } else {
        // Si el usuario no está autenticado, solicita la autenticación
        handleAuthClick();
    }
}

// Función para sobrescribir un archivo en Google Drive con un nuevo contenido
async function sobrescribirImagen(imagenId, nuevaImagen) {
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) { // Verifica si el usuario ya está autenticado
        const drive = gapi.client.drive;

        // Crea un objeto Blob con el nuevo contenido del archivo
        const blob = new Blob([nuevaImagen], { type: 'image/jpeg' });
        const media = new MediaStream(blob);

        try {
            // Sobrescribe el archivo en Google Drive con el nuevo contenido
            await drive.files.update({
                imagenId,     // ID del archivo a sobrescribir
                media,      // Nuevo contenido del archivo
            });
            console.log(`Archivo con ID ${imagenId} sobrescrito.`);
        } catch (error) {
            console.error('Error al sobrescribir el archivo:', error);
        }
    } else {
        // Si el usuario no está autenticado, solicita la autenticación
        handleAuthClick();
    }
}

// Exporta las funciones para su uso en otros módulos
//export { guardarImagen, encontrarImagen, sobrescribirImagen, carpeta1, carpeta2, carpeta3 };
