// Inicializa la carta oculta
document.getElementById('carta').style.display = 'none';

// Manejador del botón "Sí"
document.getElementById('yes').onclick = function() {
    document.getElementById('message-container').style.display = 'none'; // Ocultar mensaje
    document.getElementById('riddle').style.display = 'block'; // Mostrar acertijo
};

// Variables para el tamaño del botón y el conteo
let noThanksCount = 0;
const maxNoThanksCount = 5;

// Manejador del botón "No"
document.getElementById('no').onclick = function() {
    noThanksCount++;
    const btnAccept = document.getElementById('open');

    // Agranda el botón
    btnAccept.classList.add('enlarged');
    setTimeout(() => {
        btnAccept.classList.remove('enlarged'); // Vuelve al tamaño original
    }, 300); // Duración del agrandamiento

    if (noThanksCount >= maxNoThanksCount) {
        // Si se han hecho 5 clics, mostrar el mensaje de lástima
        alert('Lo siento, ya no puedes rechazar.');
        document.getElementById('accepted-interface').style.display = 'block'; // Mostrar la nueva interfaz
    }
};

// Manejador del botón "Enviar" para el acertijo
document.getElementById('submit-riddle').onclick = function() {
    const correctAnswers = {
        "select-samy": "2",
        "select-chisu": "1",
        "select-sora": "3"
    };

    let correct = true;
    const feedback = document.getElementById('riddle-feedback');
    feedback.style.display = "none"; // Oculta el feedback al inicio

    for (const [key, value] of Object.entries(correctAnswers)) {
        const selectedValue = document.getElementById(key).value;
        if (selectedValue !== value) {
            correct = false;
            break;
        }
    }

    if (correct) {
        feedback.innerHTML = "¡Mensaje desencriptado! ¿Deseas ver la carta?";
        feedback.style.color = "green";
        feedback.style.display = "block";

        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id="see-letter">Sí, quiero ver la carta</button>
            <button id="no-see-letter">No, gracias</button>
        `;
        feedback.appendChild(buttonContainer);

        document.getElementById('see-letter').onclick = function() {
            feedback.style.display = 'none';
            document.getElementById('riddle').style.display = 'none'; // Ocultar acertijo
            document.getElementById('carta').style.display = 'block'; // Mostrar la carta
            openLetter(); // Abrir la carta
        };

        document.getElementById('no-see-letter').onclick = function() {
            feedback.innerHTML = "¡Tal vez en otra ocasión!";
            feedback.style.color = "red";
            feedback.style.display = "block";
            buttonContainer.remove();
        };
    } else {
        feedback.innerHTML = "Inténtalo de nuevo.";
        feedback.style.color = "red";
        feedback.style.display = "block";
    }
};

// Referencias a elementos
const btnOpenElement = document.querySelector('#open');
const btnCloseElement = document.querySelector('#close');
const cartaElement = document.getElementById('carta');
const acceptedInterface = document.getElementById('accepted-interface');
const heartElement = document.querySelector('.heart');

// Abrir la carta al hacer clic en "Abrir"
btnOpenElement.addEventListener('click', () => {
    openLetter(); // Llama a la función para abrir la carta
});

// Cerrar la carta automáticamente después de 8 segundos
let closeTimer;

// Función para abrir la carta
function openLetter() {
    btnOpenElement.disabled = true;
    btnCloseElement.disabled = false;
    const coverElement = document.querySelector('.cover');
    coverElement.classList.add('open-cover');

    setTimeout(() => {
        coverElement.style.zIndex = -1;
        const paperElement = document.querySelector('.paper');
        paperElement.classList.remove('close-paper');
        paperElement.classList.add('open-paper');
        heartElement.style.display = 'block';

        // Cambiar los botones después de 5 segundos
        setTimeout(() => {
            btnOpenElement.innerText = "Acepto";
            btnCloseElement.innerText = "No gracias";
        }, 5000); // Espera 5 segundos

        // Iniciar el temporizador para cerrar la carta
        closeTimer = setTimeout(() => {
            closeLetter(); // Cerrar carta después de 8 segundos
        }, 8000); // 8 segundos en total

    }, 500);
}

// Función para cerrar la carta
function closeLetter() {
    clearTimeout(closeTimer); // Limpiar el temporizador si se cierra manualmente
    btnOpenElement.disabled = false;
    btnCloseElement.disabled = true;

    const coverElement = document.querySelector('.cover');
    const paperElement = document.querySelector('.paper');
    paperElement.classList.remove('open-paper');
    paperElement.classList.add('close-paper');

    setTimeout(() => {
        coverElement.style.zIndex = 0;
        coverElement.classList.remove('open-cover');
        heartElement.style.display = 'none';
    }, 500);
}

// Evento para cerrar la carta manualmente
btnCloseElement.addEventListener('click', closeLetter);

// Manejador del botón "Acepto"
btnOpenElement.addEventListener('click', () => {
    if (btnOpenElement.innerText === "Acepto") {
        // Oculta todo el contenido actual
        document.getElementById('message-container').style.display = 'none';
        document.getElementById('riddle').style.display = 'none';
        document.getElementById('carta').style.display = 'none';
        
        // Muestra la nueva interfaz
        acceptedInterface.style.display = 'block';
        acceptedInterface.scrollIntoView(); // Desplaza la vista hacia la nueva interfaz
    }
});