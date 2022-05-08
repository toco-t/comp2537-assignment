function randomPokemons() {
  for (let i = 0; i < 9; i++) {
    let random_num = Math.floor(Math.random() * 151) + 1

    let poke_img = `<div class="pokemon"><p>No. ${random_num}</p><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${random_num}.gif"></img></div>`

    if (i < 3) {
      $(".first").append(poke_img)
    } else if (i < 6) {
      $(".second").append(poke_img)
    } else {
      $(".third").append(poke_img)
    }
  }
}

$(document).ready(() => {
  randomPokemons();
});
