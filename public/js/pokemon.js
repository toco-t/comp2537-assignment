var i = 0;
var hp = 0;

function move() {
  if (i == 0) {
    i = 1;
    var width = hp / 10;
    var id = setInterval(frame, width);
    function frame() {
      if (width >= hp) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        $("#hp-bar").width(width + "%");
        $("#hp-bar").html("HP: " + width);
      }
    }
  }
}



function pokemonCard(data){
  $(".name").html(data.name.toUpperCase());
  $(".type").html(`Type: ${data.types[0].type.name.toUpperCase()}`);
  $("img").attr("src", data.sprites.other["official-artwork"].front_default);
  $(".length").html(`Length: ${data.height / 10}m`);
  $(".weight").html(`Weight: ${data.weight / 10}kg`);

  hp = data.stats.filter((obj) => {
    return obj.stat.name == 'hp'
  }).map((obj) =>{
    return obj.base_stat
  });

  $("#hp-bar").html(`HP: `);

  let type = data.types[0].type.name
  if (type == "fire") {
    $(".card-row").css("background-color", "#FDDFDF");
  }
  else if (type == "grass") {
    $(".card-row").css("background-color", "#DEFDE0");
  }
  else if (type == "electric") {
    $(".card-row").css("background-color", "#FCF7DE");
  }
  else if (type == "water") {
    $(".card-row").css("background-color", "#33ccff");
  }
  else if (type == "ground") {
    $(".card-row").css("background-color", "#f4e7da");
  }
  else if (type == "rock") {
    $(".card-row").css("background-color", "#d5d5d4");
  }
  else if (type == "fairy") {
    $(".card-row").css("background-color", "#fceaff");
  }
  else if (type == "poison") {
    $(".card-row").css("background-color", "#98d7a5");
  }
  else if (type == "bug") {
    $(".card-row").css("background-color", "#f8d5a3");
  }
  else if (type == "dragon") {
    $(".card-row").css("background-color", "#97b3e6");
  }
  else if (type == "psychic") {
    $(".card-row").css("background-color", "#eceda1");
  }
  else if (type == "flying") {
    $(".card-row").css("background-color", "#F5F5F5");
  }
  else if (type == "fighting") {
    $(".card-row").css("background-color", "#E6E0D4");
  }
  else if (type == "normal") {
    $(".card-row").css("background-color", "#F5F5F5");
  } else {
    console.log(type);
  }
}

$(document).ready(() => {
      let params = new URLSearchParams(window.location.search);
      let id = params.get("id");

    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      type: "GET",
      success: pokemonCard
    })

    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
      type: "GET",
      success: (data) => {
          $(".description").html(data.flavor_text_entries[0].flavor_text);
      }
    })

    $("#hp").click(move);
})
