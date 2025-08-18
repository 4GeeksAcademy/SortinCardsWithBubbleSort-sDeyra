import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function () {
  //write your code here
  document.getElementById("botonSort").addEventListener("click", () =>{
    const cantidad = parseInt(document.getElementById("inputCantidad").value);

    if (isNaN(cantidad) || cantidad < 1 || cantidad > 52){
      alert("porfavor introduce un numero valido entre 1 y 52");
      return;
    }

    variasCartasAleatorias(cantidad);
  })

};

let palo = ["♦", "♥", "♠", "♣"]
let numero = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let cartasActuales = []


const generarCarta = () => {

  let paloAleatorio = palo[Math.floor(Math.random() * palo.length)];
  console.log(paloAleatorio)

  let numeroAleatorio = numero[Math.floor(Math.random() * numero.length)];
  console.log(numeroAleatorio)

  return {palo : paloAleatorio, valor: numeroAleatorio};
}

const crearCartaHTML = (carta) => {
  let divCarta = document.createElement("div")
  divCarta.className = "carta"

  let color = (carta.palo == "♥" || carta.palo == "♦") ? "red" : "black";

  divCarta.innerHTML = `
  <div style="color: ${color}; font-size: 24px;">${carta.palo}</div>
  <div style="font-size: 32px;">${carta.valor}</div>
  <div style="color: ${color}; font-size: 24px;">${carta.palo}</div>
`;
  return divCarta;
}

const variasCartasAleatorias = (cantidad) => {
  if (cantidad < 1) {
    alert("No se puede hacer pai");
    return
  };
  const contenedor = document.getElementById("contenedorCartas1");
  contenedor.innerHTML = "";

  cartasActuales = [];

  for (let i = 0; i < cantidad; i++) {
    let carta = generarCarta();
    cartasActuales.push(carta);
    let cartaHTML = crearCartaHTML(carta)
    contenedor.appendChild(cartaHTML)
  }
}



