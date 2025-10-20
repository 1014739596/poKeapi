var esFavorito = false;

// Función para agregar o quitar un Pokémon de favoritos
function toggleFavorito(paramid, paramname) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  let existe = favoritos.some(poke => poke.name === paramname);

  if (existe) {
    favoritos = favoritos.filter(poke => poke.name !== paramname);
    esFavorito = false;
  } else {
    favoritos.push({
      name: paramname,
      url: `https://pokeapi.co/api/v2/pokemon/${paramid}/`
    });
    esFavorito = true;
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  const boton = document.querySelector(`#corazon-${paramid}`);
  if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}

async function Detalle(parametro) {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${parametro}`);
  const data = await res.json();

  favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  esFavorito = favoritos.some(poke => poke.name === data.name);

  // Tipos del Pokémon
  let tipoPoke = "";
  for (let i = 0; i < data.types.length; i++) {
    tipoPoke += `<span class="tipo">${data.types[i].type.name}</span>`;
  }

  const detalle = `
    <section class="detalle-card">
      <div class="detalle-header">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" 
             alt="${data.name}" class="detalle-img">
        <h2 class="detalle-nombre">${data.name}</h2>
        <p class="detalle-id">#${data.id}</p>
        <div class="detalle-tipos">${tipoPoke}</div>
      </div>

      <div class="detalle-stats">
        <p><strong>Altura:</strong> ${data.height / 10} m</p>
        <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
        <p><strong>HP:</strong> ${data.stats[0].base_stat}</p>
        <p><strong>Velocidad:</strong> ${data.stats[5].base_stat}</p>
        <p><strong>Ataque:</strong> ${data.stats[1].base_stat}</p>
        <p><strong>Defensa:</strong> ${data.stats[2].base_stat}</p>
        <p><strong>Ataque Especial:</strong> ${data.stats[3].base_stat}</p>
        <p><strong>Defensa Especial:</strong> ${data.stats[4].base_stat}</p>
      </div>

      <button class="btn-favorito" onClick="toggleFavorito(${data.id}, '${data.name}')">
        <span id="corazon-${data.id}">${esFavorito ? '❤️' : '🤍'}</span> Favorito
      </button>
    </section>
  `;

  root.innerHTML = detalle;
}
