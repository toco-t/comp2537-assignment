var tax = 0.12;
var sub_total = 0;

$(document).ready(

  $.ajax({
    url: `http://localhost:5000/bag`,
    type: "GET",
    success: (data) => {
      for (let i=0; i<data.cart.length; i++) {
        sub_total += (data.cart[i].price * 10) * data.cart[i].quantity;

        $(".bag__contents").append(
          `<div class="bag__contents__card"><p>No. ${data.cart[i].pokemon_id}</p>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.cart[i].pokemon_id}.gif"></img><p>&#165;${data.cart[i].price * 10}</P><p>x${data.cart[i].quantity}</p></div>`
        )
      }

      $("#bag__subtotal").html(`&#165; ${sub_total}`);
      $("#bag__total").html(`&#165; ${sub_total * (1 + tax)}`);
    }
  })
)
