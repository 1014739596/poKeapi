// Recuperar los pokémon capturados desde localStorage
var misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

// Asegurar que exista la variable pokemones y totalPokes
// (Si ya las tienes definidas, puedes omitir esto)
if (typeof totalPokes === "undefined") totalPokes = 151; // Por defecto Kanto
if (typeof pokemones === "undefined") pokemones = [];

// -------------------- FUNCIÓN ALEATORIOS --------------------
function Aleatorios() {
  const nuevos = document.getElementById("nuevos");
  if (!nuevos) return;
  nuevos.innerHTML = "";

  console.log("Generando 4 pokémon aleatorios...");
  let pokesAleatorios = "";

  for (let i = 0; i < 4; i++) {
    const num = Math.floor(Math.random() * totalPokes) + 1;

    pokesAleatorios += `
      <div class="c-lista-pokemon c-un_aleatorio">
        <p>#${num}</p>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png" 
             alt="${pokemones[num - 1]?.name || "Pokémon"}" width="60" height="60">
        <p>${pokemones[num - 1]?.name || "Desconocido"}</p>
      </div>
    `;

    // Verificar si el pokémon ya estaba capturado
    let existe = misNumeros.includes(num);

    if (!existe) {
      misNumeros.push(num);
      localStorage.setItem("misNumeros", JSON.stringify(misNumeros));

      // Si existe un elemento con id "c-unpoke-X", lo actualiza
      const pokeEl = document.getElementById("c-unpoke-" + num);
      if (pokeEl) {
        pokeEl.innerHTML = `
          <div onclick="Detalle('${num}')">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png"
                 width="auto" height="45" loading="lazy" alt="${num}">
            <p>#${num}</p>
          </div>`;
        pokeEl.classList.add("c-mios-pokemon");
      }
    }
  }

  nuevos.innerHTML += pokesAleatorios;
  document.getElementById("contador").textContent = `${misNumeros.length} / ${totalPokes}`;
}

// -------------------- FUNCIÓN CAPTURADOS --------------------
function Capturados() {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = "";

  // Crear contenedor de nuevos pokémon aleatorios
  const capturaAleatoria = document.createElement("section");
  capturaAleatoria.classList.add("c-lista");
  capturaAleatoria.id = "nuevos";

  // Crear botón para generar nuevos aleatorios
  const boton = document.createElement("button");
  boton.textContent = "4 nuevos";
  boton.classList.add("btn-nuevos");
  boton.addEventListener("click", Aleatorios);

  // Crear contenedor de álbum
  const seccionCapturados = document.createElement("section");
  seccionCapturados.classList.add("c-lista", "c-album");

  // Asegurar que la lista esté actualizada
  misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

  // Renderizar todos los pokémon hasta totalPokes
  let misPokes = "";
  for (let i = 1; i <= totalPokes; i++) {
    if (misNumeros.includes(i)) {
      misPokes += `
        <div class="c-unpoke c-mios-pokemon poke-${i}" onclick="Detalle('${i}')">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png"
               width="auto" height="60" loading="lazy" alt="${i}">
          <p>#${i}</p>
        </div>`;
    } else {
      misPokes += `
        <div class="c-unpoke" id="c-unpoke-${i}">
          <p>#${i}</p>
        </div>`;
    }
  }
  seccionCapturados.innerHTML = misPokes;

  // Contador de capturados
  const contador = document.createElement("p");
  contador.id = "contador";
  contador.classList.add("contador");
  contador.textContent = `${misNumeros.length} / ${totalPokes}`;

  // Agregar elementos al DOM
  root.appendChild(contador);
  root.appendChild(boton);
  root.appendChild(capturaAleatoria);
  root.appendChild(seccionCapturados);
}

// -------------------- AUTOEJECUCIÓN --------------------
document.addEventListener("DOMContentLoaded", Capturados);
