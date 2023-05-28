const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  electric: "#F7D02C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC"
};

let allPokemons = []; // Variable para almacenar todos los Pokémon

async function getPokemons() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const resPokemons = await res.json();
    await getDetailPokemons(resPokemons.results);
  } catch (error) {
    console.log(error);
  }
}

async function getDetailPokemons(pokemons) {
  try {
    const pokemonsPromises = pokemons.map(pokemon => fetch(pokemon.url));
    const resDetailPokemons = await Promise.all(pokemonsPromises);
    const detailPokemons = await Promise.all(resDetailPokemons.map(res => res.json()));
    const detailedPokemons = await Promise.all(detailPokemons.map(async (pokemon) => {
      const speciesResponse = await fetch(pokemon.species.url);
      const species = await speciesResponse.json();
      return { ...pokemon, species };
    }));
    allPokemons = detailedPokemons; // Almacenar todos los Pokémon en la variable
    showPokemons(detailedPokemons);
  } catch (error) {
    console.log(error);
  }
}

function showPokemons(pokemons) {
  const pokedex = document.getElementById("pokedex");
  pokedex.innerHTML = ""; // Limpiar la lista antes de mostrar los nuevos Pokémon
  pokemons.forEach(pokemon => {
    const card = document.createElement("li");
    card.className = "card";

    const image = document.createElement("img");
    image.src = pokemon.sprites.front_default;
    image.alt = pokemon.name;
    image.className = "card-image";

    const title = document.createElement("h2");
    title.textContent = pokemon.name;
    title.className = "card-title";

    const subtitle = document.createElement("p");
    subtitle.textContent = `#${pokemon.id}`;
    subtitle.className = "card-subtitle";

    const types = document.createElement("p");
    types.textContent = "Types: ";
    types.className = "card-types";
    pokemon.types.forEach(type => {
      const typeSpan = document.createElement("span");
      typeSpan.textContent = type.type.name;
      typeSpan.className = "type";
      typeSpan.style.backgroundColor = typeColors[type.type.name];
      types.appendChild(typeSpan);
    });

    const speciesInfo = document.createElement("p");
    speciesInfo.textContent = `Species: ${pokemon.species.name}`;
    speciesInfo.className = "card-species";

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(subtitle);
    card.appendChild(types);
    card.appendChild(speciesInfo);
    pokedex.appendChild(card);
  });
}

function filterPokemonsByType(type) {
  if (type === "ver-todos") {
    showPokemons(allPokemons); // Mostrar todos los Pokémon
  } else {
    const filteredPokemons = allPokemons.filter(pokemon => {
      return pokemon.types.some(pokemonType => pokemonType.type.name === type);
    });
    showPokemons(filteredPokemons);
  }
}


// Obtener los botones por su ID
const typeButtons = document.querySelectorAll(".btn-header");

// Agregar evento de clic a cada botón
typeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const type = button.id; // Obtener el tipo del botón
    filterPokemonsByType(type);
  });
});

getPokemons();
