
window.onload = function () {
  const drawButton = document.getElementById("drawButton");
  const sortButton = document.getElementById("sortButton");

  drawButton.addEventListener("click", () => {
    const cantidad = parseInt(document.getElementById("cardCountInput").value);

    if (isNaN(cantidad) || cantidad < 1 || cantidad > 52) {
      alert("Por favor introduce un número válido entre 1 y 52");
      return;
    }

    generarVariasCartas(cantidad);
  });

  sortButton.addEventListener("click", () => {
    ordenarCartasConLog();
  });
};

const palos = ["♦", "♥", "♠", "♣"];
const valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const valoresNumericos = {
  "A": 1, "2": 2, "3": 3, "4": 4, "5": 5,
  "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
  "J": 11, "Q": 12, "K": 13
};

let cartasActuales = [];
let logCambios = [];
let cambiosOrden = []; 

function generarCarta() {
  const paloAleatorio = palos[Math.floor(Math.random() * palos.length)];
  const valorAleatorio = valores[Math.floor(Math.random() * valores.length)];

  return { palo: paloAleatorio, valor: valorAleatorio };
}

function crearCartaHTML(carta) {
  const divCarta = document.createElement("div");
  divCarta.className = "card";

  if (carta.palo === "♥" || carta.palo === "♦") {
    divCarta.classList.add("red");
  }

  divCarta.setAttribute("data-value", carta.valor);
  divCarta.innerHTML = `
    <div class="card-suit">${carta.palo}</div>
  `;

  return divCarta;
}

function generarVariasCartas(cantidad) {
  const mano = document.getElementById("hand");
  const logDiv = document.getElementById("sortLog");

  mano.innerHTML = "";
  logDiv.innerHTML = "";
  cartasActuales = [];
  logCambios = [];
  cambiosOrden = [];

  for (let i = 0; i < cantidad; i++) {
    const nuevaCarta = generarCarta();
    cartasActuales.push(nuevaCarta);

    const cartaHTML = crearCartaHTML(nuevaCarta);
    mano.appendChild(cartaHTML);
  }
}

function ordenarCartasConLog() {
  const logDiv = document.getElementById("sortLog");
  logDiv.innerHTML = "";
  
  let copiaCartas = [...cartasActuales];
  logCambios = [];
  cambiosOrden = [];

  // Bubble Sort
  let n = copiaCartas.length;
  let swapped;

  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    logCambios.push(`Iteración ${i + 1}:`);

    for (let j = 0; j < n - 1 - i; j++) {
      if (valoresNumericos[copiaCartas[j].valor] > valoresNumericos[copiaCartas[j + 1].valor]) {
        // Intercambio
        [copiaCartas[j], copiaCartas[j + 1]] = [copiaCartas[j + 1], copiaCartas[j]];
        swapped = true;

        // Guardar cambio y estado actual
        logCambios.push(`  Intercambio posiciones ${j} y ${j + 1}`);
        const estado = copiaCartas.map(c => c.valor + c.palo).join(", ");
        logCambios.push(`  Estado actual: ${estado}`);

        cambiosOrden.push([...copiaCartas]);
      }
    }

    if (!swapped) break;
  }

  // Cartas ordenadas
  const mano = document.getElementById("hand");
  mano.innerHTML = "";
  copiaCartas.forEach(carta => {
    const cartaHTML = crearCartaHTML(carta);
    mano.appendChild(cartaHTML);
  });

  // Todos los cambios
  cambiosOrden.forEach((estado, index) => {
    const divEstado = document.createElement("div");
    divEstado.className = "log-step state";
    divEstado.innerText = `Cambio ${index + 1}: ` + estado.map(c => c.valor + c.palo).join(", ");
    logDiv.appendChild(divEstado);
  });

  // Texto
  logCambios.forEach(mensaje => {
    const divPaso = document.createElement("div");
    divPaso.className = "log-step";
    divPaso.innerText = mensaje;
    logDiv.appendChild(divPaso);
  });

  cartasActuales = copiaCartas;
}




