
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

  for (let i = 0; i < copiaCartas.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < copiaCartas.length; j++) {
      if (
        valoresNumericos[copiaCartas[j].valor] <
        valoresNumericos[copiaCartas[minIndex].valor]
      ) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // Guardar cambio
      logCambios.push(
        `Intercambio carta en posición ${i} con carta en posición ${minIndex}`
      );

      // Intercambiar
      let temp = copiaCartas[i];
      copiaCartas[i] = copiaCartas[minIndex];
      copiaCartas[minIndex] = temp;

      // Agregar estado actual
      const estado = copiaCartas.map(c => c.valor + c.palo).join(", ");
      logCambios.push("Estado actual: " + estado);
    }
  }

  // Mostrar cartas ordenadas
  const mano = document.getElementById("hand");
  mano.innerHTML = "";
  copiaCartas.forEach(carta => {
    const cartaHTML = crearCartaHTML(carta);
    mano.appendChild(cartaHTML);
  });

  // Mostrar cambioss
  logCambios.forEach((mensaje, index) => {
    const divPaso = document.createElement("div");
    divPaso.className = "log-step";
    divPaso.innerText = mensaje;
    logDiv.appendChild(divPaso);
  });

  cartasActuales = copiaCartas;
}




