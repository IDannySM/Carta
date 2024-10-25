// Inicializa la carta oculta
document.getElementById('carta').style.display = 'none';

// Manejador del botón "Sí"
document.getElementById('yes').onclick = function() {
    document.getElementById('message-container').style.display = 'none'; // Ocultar mensaje
    document.getElementById('riddle').style.display = 'block'; // Mostrar acertijo
    document.getElementById('hidden-emoji').style.display = 'block'; // Mostrar emoji
};

// Al hacer clic en el emoji
document.getElementById('hidden-emoji').onclick = function() {
    // Oculta todas las interfaces actuales
    document.getElementById('accepted-interface').style.display = 'none';
    document.getElementById('sad-interface').style.display = 'none';
    document.getElementById('riddle').style.display = 'none';

    // Muestra el contenedor de imágenes
    document.getElementById('hidden-images').style.display = 'block';
};

let noThanksCount = 0; // Contador de clics en "No"
const maxNoThanksCount = 5; // Máximo de clics
let fontSize = 1; // Tamaño inicial de la fuente
const messages = [
    '¿Estás segura?',
    'Piénsalo bien',
    'Piénsalo muy bien',
    'Piénsalo',
    'Mira el otro botón'
];

const btnAccept = document.getElementById('open');
const btnNo = document.getElementById('no');

// Manejador del botón "No"
btnNo.addEventListener('click', () => {
    noThanksCount++;

    fontSize += 0.2; // Incremento del tamaño
    btnAccept.style.fontSize = `${fontSize}rem`;

    // Cambia el texto del botón de "No" a un mensaje aleatorio
    const indexRandom = Math.floor(Math.random() * messages.length);
    btnNo.textContent = messages[indexRandom];

    // Verifica si se alcanzó el máximo de clics
    if (noThanksCount >= maxNoThanksCount) {
        alert('Lo siento, ya no puedes rechazar.');
    }
});


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
            btnOpenElement.innerText = "Si quiero!";
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
    if (btnOpenElement.innerText === "Si quiero!") {
        // Oculta todo el contenido actual
        document.getElementById('message-container').style.display = 'none';
        document.getElementById('riddle').style.display = 'none';
        document.getElementById('carta').style.display = 'none';
        
        // Muestra la nueva interfaz
        acceptedInterface.style.display = 'block';
        acceptedInterface.scrollIntoView(); // Desplaza la vista hacia la nueva interfaz
    }
});

btnCloseElement.addEventListener('click', () => {
    if (btnCloseElement.innerText === "No gracias") {
        closeLetter(); // Cierra la carta primero

        // Oculta otras interfaces
        document.getElementById('carta').style.display = 'none'; // Oculta la carta
        document.getElementById('message-container').style.display = 'none';
        document.getElementById('riddle').style.display = 'none';

        // Mostrar la interfaz de lástima
        document.getElementById('sad-interface').style.display = 'block';
    }
});

document.getElementById('show-image').onclick = function() {
    // Oculta el contenedor de imágenes y muestra la imagen "ok"
    document.querySelector('.image-container').style.display = 'none'; // Oculta el contenedor de imágenes
    document.getElementById('displayed-image').style.display = 'block'; // Muestra la imagen OK
    document.getElementById('hand-message').style.display = 'block'; // Muestra el mensaje
    this.textContent = "Volver a las imágenes"; // Cambia el texto del botón

    // Cambia la función del botón para volver
    this.onclick = function() {
        document.getElementById('displayed-image').style.display = 'none'; // Oculta la imagen OK
        document.getElementById('hand-message').style.display = 'none'; // Oculta el mensaje
        document.querySelector('.image-container').style.display = 'flex'; // Muestra el contenedor de imágenes
        this.textContent = "Más"; // Restablece el texto del botón
        this.onclick = arguments.callee; // Restablece la función original
    };
};

