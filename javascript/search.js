const form = document.getElementById('filterForm');
const nameFilter = document.getElementById('nameFilter');
const pokemonCards = document.getElementsByClassName('card');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe
  
  const filterValue = nameFilter.value.toLowerCase(); // Obtén el valor del filtro y conviértelo a minúsculas
  
  // Recorre las cartas de los Pokémon y muestra solo aquellas cuyo nombre coincide con el filtro
  for (let i = 0; i < pokemonCards.length; i++) {
    const card = pokemonCards[i];
    const name = card.querySelector('.card-title').textContent.toLowerCase();
    
    if (name.includes(filterValue)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  }
});
