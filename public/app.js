function process(data) {
  first = ""
  second = ""
  third = ""

  for (let i = 0; i < 3; i++) {
    var random_num = Math.random() * 151 + 1
    first += `<div class="pokemon"><p>No. ${i}</p>${data.results[i].name}</div>`
  }
  $(".first").html(first);

  for (let i = 3; i < 6; i++) {
    second += `<div class="pokemon"><p>No. ${i}</p>${data.results[i].name}</div>`
  }
  $(".second").html(second);

  for (let i = 6; i < 9; i++) {
    third += `<div class="pokemon"><p>No. ${i}</p>${data.results[i].name}</div>`
  }
  $(".third").html(third);
}

function randomPokemon() {
  $.ajax({
    url: "https://pokeapi.co/api/v2/pokemon",
    type: "GET",
    success: process
  })
}

$(document).ready(randomPokemon);
