const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const pokemonDisplay = document.getElementById("pokemonDisplay");

searchButton.addEventListener("click", fetchPokemon);

async function fetchPokemon() {
  const name = searchInput.value.trim().toLowerCase();
  if (!name) {
    pokemonDisplay.innerHTML = `<p>Por favor, ingresa un nombre de Pokémon.</p>`;
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error("Pokémon no encontrado");
    const data = await response.json();
    renderPokemon(data);
  } catch (error) {
    pokemonDisplay.innerHTML = `<p>${error.message}</p>`;
  }
}

function renderPokemon(pokemon) {
  pokemonDisplay.innerHTML = `
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <h3>${capitalize(pokemon.name)}</h3>
    <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
    <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
    <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
  `;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
