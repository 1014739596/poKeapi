
let misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

const totalPokes = 151;

function Aleatorios() {
  const nuevos = document.getElementById("nuevos");
  nuevos.innerHTML = "";
  console.log("Generando 4 nuevos pokémon aleatorios...");

  for (let i = 0; i < 4; i++) {
    const num = Math.floor(Math.random() * totalPokes) + 1;

    // Mostrar en la sección de nuevos
    const div = document.createElement("div");
    div.classList.add("c-lista-pokemon", "c-un_aleatorio");
    div.innerHTML = `
      <p>#${num}</p>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png" 
           alt="Pokémon ${num}" width="70" height="70">
      <p>${"Pokémon " + num}</p>
    `;
    nuevos.appendChild(div);

    // Si no existe en localStorage, lo agrega
    if (!misNumeros.includes(num)) {
      misNumeros.push(num);
      localStorage.setItem("misNumeros", JSON.stringify(misNumeros));
    }
  }

  // Actualiza la vista
  renderCapturados();
}

// Función principal: renderiza TODOS los pokémon capturados
function renderCapturados() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  // Contador
  const contador = document.createElement("p");
  contador.id = "contador";
  contador.textContent = `${misNumeros.length} / ${totalPokes}`;
  contador.classList.add("contador");

  // Botón
  const boton = document.createElement("button");
  boton.textContent = "4 nuevos";
  boton.classList.add("btn-nuevos");
  boton.addEventListener("click", Aleatorios);

  // Sección de nuevos
  const nuevos = document.createElement("section");
  nuevos.classList.add("c-lista");
  nuevos.id = "nuevos";

  // Sección de álbum completo
  const seccionCapturados = document.createElement("section");
  seccionCapturados.classList.add("c-lista", "c-album");

  // Releer capturados (por si se actualizaron)
  misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

  // Mostrar todos los Pokémon capturados
  if (misNumeros.length === 0) {
    seccionCapturados.innerHTML = `
      <div style="text-align:center; width:100%; padding:20px;">
        <p>Aún no has capturado ningún Pokémon</p>
      </div>
    `;
  } else {
    misNumeros.forEach((num) => {
      const div = document.createElement("div");
      div.classList.add("c-unpoke", "c-mios-pokemon");
      div.onclick = () => Detalle(num);
      div.innerHTML = `
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png"
             width="auto" height="60" loading="lazy" alt="${num}">
        <p>#${num}</p>
      `;
      seccionCapturados.appendChild(div);
    });
  }

  // Agregar todo al DOM
  root.appendChild(contador);
  root.appendChild(boton);
  root.appendChild(nuevos);
  root.appendChild(seccionCapturados);
}

// Autoejecutar al cargar la página
document.addEventListener("DOMContentLoaded", renderCapturados);
