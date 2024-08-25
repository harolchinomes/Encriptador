const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");

function contieneMayusculas(texto) {
    return /[A-Z]/.test(texto);
}

function mostrarAlertaPersonalizada(mensaje) {
    modalMessage.textContent = mensaje;
    alertModal.style.display = 'flex'; // Muestra el modal
}

function ocultarModal() {
    alertModal.style.display = 'none'; // Oculta el modal
}

function btnEncriptar() {
    const texto = textArea.value.trim(); // Usa trim() para eliminar espacios en blanco
    if (texto === "") {
        mostrarAlertaPersonalizada('Por favor, ingrese un texto para encriptar.');
        return; // Detiene la función si el texto está vacío
    }
    if (contieneMayusculas(texto)) {
        mostrarAlertaPersonalizada('Por favor, ingrese solo letras minúsculas sin acentos.');
        return; // Detiene la función si hay mayúsculas
    }
    const textoEncriptado = encriptar(texto);
    mensaje.value = textoEncriptado;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
}

function btnDesencriptar() {
    const texto = textArea.value.trim(); // Usa trim() para eliminar espacios en blanco
    if (texto === "") {
        mostrarAlertaPersonalizada('Por favor, ingrese un texto para desencriptar.');
        return; // Detiene la función si el texto está vacío
    }
    if (contieneMayusculas(texto)) {
        mostrarAlertaPersonalizada('Por favor, ingrese solo letras minúsculas sin acentos.');
        return; // Detiene la función si hay mayúsculas
    }
    const textoDesencriptado = desencriptar(texto);
    mensaje.value = textoDesencriptado;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptada;
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptada;
}

function copyText() {
    const textToCopy = mensaje.value;

    // Verifica si hay texto en el área de mensaje
    if (textToCopy.trim() === "") {
        mostrarAlertaPersonalizada('No hay texto para copiar.');
        return;
    }

    // Crea un elemento de texto temporal
    const tempInput = document.createElement('input');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);

    // Selecciona el contenido del elemento
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copia el contenido al portapapeles
    document.execCommand('copy');

    // Elimina el elemento temporal
    document.body.removeChild(tempInput);

    // Limpia el área de mensaje
    mensaje.value = "";
    mensaje.style.backgroundImage = ""; // Opcional, en caso de que quieras resetear la imagen de fondo
    textArea.value = ""; // Limpia el área de entrada de texto también, si es necesario

    // Muestra el modal con el mensaje de copia
    mostrarAlertaPersonalizada('Texto copiado al portapapeles!');
}

const alertModal = document.getElementById('alertModal');
const modalMessage = document.getElementById('modalMessage');
const closeModalButton = document.getElementById('closeModalButton');

// Event listener para el botón de cerrar del modal
closeModalButton.addEventListener('click', ocultarModal);