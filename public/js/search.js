var ids = [];
var current_page = 1;

// $("body").on("click", ".page-button", () => {
//
// })

function insertEvent(filter) {
  var now = new Date(Date.now());

  $.ajax({
    url: `https://serene-garden-30886.herokuapp.com/timeline`,
    type: "POST",
    data: {
      content: `Searched by... ${filter}`,
      time: now,
    },
    success: (res) => {
      console.log(res);
    }
  })
}

// type
$("#type").change(function() {
  $('#region').get(0).selectedIndex = 0;
  $('#name').get(0).selectedIndex = 0;
  $(".first-row").html("");
  $(".second-row").html("");
  $(".third-row").html("");
  $(".pages").html("");

  $.ajax({
    url: `https://pokeapi.co/api/v2/type/${$("#type").val()}/`,
    type: "GET",
    success: (data) => {
      num_pages = Math.ceil(data.pokemon.length / 9);
      for (let i = 1; i <= num_pages; i++) {
        $(".pages").append(`<button id="${i}" class="page-button">${i}</button>`)
      }

      for (let i = 0; i < 9; i++) {
        let url = (data.pokemon[i].pokemon.url).split("/");
        let id = url[6];

        let filteredPokemon = `<div class="pokemon"><a href="pokemon.html?id=${id}"><p>No. ${id}</p><p class="filtered">${data.pokemon[i].pokemon.name.toUpperCase()}</p></a></div>`

        if (i < 3) {
          $(".first-row").append(filteredPokemon);
        } else if (i < 6) {
          $(".second-row").append(filteredPokemon);
        } else if (i < 9) {
          $(".third-row").append(filteredPokemon);
        }
      }
    }
  })

  insertEvent("Type");
})

// region
$("#region").change(function() {
  $('#type').get(0).selectedIndex = 0;
  $('#name').get(0).selectedIndex = 0;
  $(".first-row").html("");
  $(".second-row").html("");
  $(".third-row").html("");
  $(".pages").html("");

  pokemon_region = $("#region").val();

  $.ajax({
    url: `https://pokeapi.co/api/v2/pokedex/${pokemon_region}/`,
    type: "GET",
    success: (data) => {
      num_pages = Math.ceil(data.pokemon_entries.length / 9);
      for (let i = 1; i <= num_pages; i++) {
        $(".pages").append(`<button id="${i}" class="page-button">${i}</button>`)
      }

      for (let i = 0; i < data.pokemon_entries.length; i++) {
        let url = (data.pokemon_entries[i].pokemon_species.url).split("/");
        let id = url[6];
        ids.push(id);

        let filteredPokemon = `<div class="pokemon"><a href="pokemon.html?id=${id}"><p>No. ${id}</p><p class="filtered">${data.pokemon_entries[i].pokemon_species.name.toUpperCase()}</p></a></div>`

        if (i < 3) {
          $(".first-row").append(filteredPokemon);
        } else if (i < 6) {
          $(".second-row").append(filteredPokemon);
        } else if (i < 9) {
          $(".third-row").append(filteredPokemon);
        }
      }
    }
  })

    insertEvent("Region");
})

$("#name").change(function() {
  $('#type').get(0).selectedIndex = 0;
  $('#region').get(0).selectedIndex = 0;
  $(".first-row").html("");
  $(".second-row").html("");
  $(".third-row").html("");
  $(".pages").html("");

  var pokemon_name = $("#name").val();

  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/?limit=1500`,
    type: "GET",
    success: (data) => {
      var filteredPokemons = []


      for (let i = 0; i < data.results.length; i++) {
        if (pokemon_name.includes(String(data.results[i].name[0]))) {
          filteredPokemons.push(i);
        }
      }

      num_pages = Math.ceil(filteredPokemons.length / 9);
      for (let i = 1; i <= num_pages; i++) {
        $(".pages").append(`<button id="${i}" class="page-button">${i}</button>`)
      }

      for (let i = 0; i < filteredPokemons.length; i++) {
        let index = filteredPokemons[i];
        let url = (data.results[index].url).split("/");
        let id = url[6];
        ids.push(id);

        let filteredPokemon = `<div class="pokemon"><a href="pokemon.html?id=${id}"><p>No. ${id}</p><p class="filtered">${data.results[index].name.toUpperCase()}</p></a></div>`

        if (i < 3) {
          $(".first-row").append(filteredPokemon);
        } else if (i < 6) {
          $(".second-row").append(filteredPokemon);
        } else if (i < 9) {
          $(".third-row").append(filteredPokemon);
        }
      }
    }
  })

    insertEvent("Name");
})
