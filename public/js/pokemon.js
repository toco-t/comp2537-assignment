function pokemonCard(data){
  console.log(data);
  $(".name").html(data.name.toUpperCase());
  $(".type").html(`Type: ${data.types[0].type.name.toUpperCase()}`);
  $("img").attr("src", data.sprites.other.dream_world.front_default);
  $(".length").html(`Length: ${data.height / 10}m`);
  $(".weight").html(`Weight: ${data.weight / 10}kg`);
}

$(document).ready(() => {
      let params = new URLSearchParams(window.location.search);
      let id = params.get("id");

    $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      type: "GET",
      success: pokemonCard
    })
})
