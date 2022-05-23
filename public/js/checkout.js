var tax = 0.12;
var sub_total = 0;
var count = 0;
var total = 0;
var ids = [];

$(document).ready(

  $.ajax({
    url: `http://localhost:5000/bag`,
    type: "GET",
    success: (data) => {
      for (let i=0; i<data.cart.length; i++) {
        sub_total += (data.cart[i].price * 10) * data.cart[i].quantity;
        count += parseInt(data.cart[i].quantity);
        ids.push(data.cart[i].pokemon_id);

        $(".bag__contents").append(
          `<div class="bag__contents__card"><p>No. ${data.cart[i].pokemon_id}</p>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${data.cart[i].pokemon_id}.gif"></img><p>&#165;${data.cart[i].price * 10}</P><p>x${data.cart[i].quantity}</p></div>`
        )
      }

      total = Math.floor(sub_total * (1 + tax))

      $("#bag__count").html(`${count}`);
      $("#bag__subtotal").html(`&#165; ${sub_total}`);
      $("#bag__total").html(`&#165; ${total}`);
    }
  })
)

function checkout() {
  var now = new Date(Date.now());

  $.ajax({
    url: `http://localhost:5000/past_orders`,
    type: "POST",
    data: {
      total: total,
      ids: ids,
      count: count,
      time: now
    },
    success: (data) => {
      window.location.href = "/account.html";
    }
  })
}
