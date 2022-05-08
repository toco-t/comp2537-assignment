$("#type").change(function() {
  $('#id').get(0).selectedIndex = 0;
  $('#name').get(0).selectedIndex = 0;

  $.ajax({
    url: `https://pokeapi.co/api/v2/type/${$("#type").val()}/`,
    type: "GET",
    success: (data) => {
      for (let i = 0; i < 9; i++) {
        let url = (data.pokemon[i].pokemon.url).split("/");
        let id = url[6]
        console.log(id);

        let filteredPokemon = `<div class="pokemon"><a href="pokemon.html?id=${id}"><p>No. ${id}</p><p>${data.pokemon[i].pokemon.name.toUpperCase()}</p></a></div>`

        if (i < 3) {
          $(".first-row").append(filteredPokemon);
        } else if (i < 6) {
          $(".second-row").append(filteredPokemon);
        } else {
          $(".third-row").append(filteredPokemon);
        }
      }
    }
  })
})

$("#id").change(function() {
  $('#type').get(0).selectedIndex = 0;
  $('#name').get(0).selectedIndex = 0;

  pokemon_id = $("#id").val();
})

$("#name").change(function() {
  $('#type').get(0).selectedIndex = 0;
  $('#id').get(0).selectedIndex = 0;

  pokemon_name = $("#name").val();
})
