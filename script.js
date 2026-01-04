// Diccionario de traducción básico para asegurar que las imágenes coincidan
const traductor = {
    "PATO": "duck", "SOL": "sun", "MANZANA": "apple", "PERRO": "dog", 
    "GATO": "cat", "LUNA": "moon", "CASA": "house", "TREN": "train",
    "FLOR": "flower", "UVA": "grapes", "ABEJA": "bee", "ARBOL": "tree",
    "AVION": "airplane", "BARCO": "boat", "BEBE": "baby", "BOCA": "mouth",
    "BOTA": "boot", "CARRO": "car", "CEBRA": "zebra", "DADO": "dice",
    "ELEFANTE": "elephant", "ESTRELLA": "star", "FUEGO": "fire", "GLOBO": "balloon",
    "HELADO": "ice cream", "HOJA": "leaf", "ISLA": "island", "JIRAFA": "giraffe",
    "LEON": "lion", "MANO": "hand", "NUBE": "cloud", "OJO": "eye",
    "OSO": "bear", "PELOTA": "ball", "QUESO": "cheese", "RATON": "mouse",
    "SAPO": "frog", "TORTUGA": "turtle", "VACA": "cow", "ZAPATO": "shoe"
    // El script usará el nombre en inglés si existe aquí, si no, usará el español.
};

const palabras = ["PATO", "SOL", "MANZANA", "PERRO", "GATO", "LUNA", "CASA", "TREN", "FLOR", "UVA"]; 
// ... (Aquí van tus 1000 palabras)

let palabraActual = "";
let progreso = "";
let errores = 0;

const imgElement = document.getElementById('imagen-palabra');
const modeloElement = document.getElementById('modelo-texto');
const progresoElement = document.getElementById('progreso-texto');
const tecladoElement = document.getElementById('teclado');

function nuevaPalabra() {
    palabraActual = palabras[Math.floor(Math.random() * palabras.length)];
    progreso = "";
    errores = 0;
    
    // 1. Buscamos la traducción o usamos la original
    const busqueda = traductor[palabraActual] || palabraActual.toLowerCase();
    
    // 2. Usamos Pixabay o un motor de búsqueda de ilustraciones (SVG/Vector)
    // Este link prioriza dibujos claros y simples
    imgElement.src = `https://loremflickr.com/400/400/${busqueda},illustration,vector,whitebackground/all?t=${Date.now()}`;
    
    modeloElement.innerText = `${palabraActual} / ${palabraActual.toLowerCase()}`;
    actualizarProgreso();
}

function actualizarProgreso() {
    let display = "";
    for (let i = 0; i < palabraActual.length; i++) {
        display += (i < progreso.length ? palabraActual[i] : "_") + " ";
    }
    progresoElement.innerText = display.trim();
}

function presionarLetra(letra) {
    const siguienteLetra = palabraActual[progreso.length];
    if (letra === siguienteLetra) {
        progreso += letra;
        actualizarProgreso();
        if (progreso === palabraActual) {
            alert("¡EXCELENTE! 👏");
            nuevaPalabra();
        }
    } else {
        errores++;
        if (errores >= 3) {
            alert(`La palabra era ${palabraActual}. ¡Intentemos otra!`);
            nuevaPalabra();
        }
    }
}

"ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("").forEach(letra => {
    const btn = document.createElement('button');
    btn.className = 'tecla';
    btn.innerHTML = `${letra}<br><small>${letra.toLowerCase()}</small>`;
    btn.onclick = () => presionarLetra(letra);
    tecladoElement.appendChild(btn);
});

nuevaPalabra();
