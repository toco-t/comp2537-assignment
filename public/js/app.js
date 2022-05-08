function specificPokemon(data){
    console.log(data);
}

async function randomPokemons(){
  for (let i = 0; i < 9; i++) {
    let id = Math.floor(Math.random() * 386) + 1
    var poke_img = ""

    await $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${id}`,
    type: "GET",
    success: (data) => {
      poke_img = data.sprites.versions["generation-v"]["black-white"].animated.front_default
    }
  })

    let randomPokemon = `<div class="pokemon" id=${id}><p>No. ${id}</p><img src=${poke_img}></img></div>`

    if (i < 3) {
      $(".first-row").append(randomPokemon)
    } else if (i < 6) {
      $(".second-row").append(randomPokemon)
    } else {
      $(".third-row").append(randomPokemon)
    }
  }
}

$(document).ready(() => {
  randomPokemons();
  $(".pokemon").on("click", specificPokemon)
});
