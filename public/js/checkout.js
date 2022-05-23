var tax = 0.12;
var sub_total = 0;
var count = 0;
var total = 0;
var ids = [];

$(document).ready(

  $.ajax({
    url: `https://serene-garden-30886.herokuapp.com/bag`,
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

      for (let i = 0; i < data.past_orders.length; i++) {
        $(".bag__past-orders").append(
          `<div class="bag__past-orders__order"><p>&#165;${data.past_orders[i].total}</p>
          <p>Number of Pokemon: ${data.past_orders[i].quantity}</p>
          <p>Time: ${data.past_orders[i].time.split("GMT")[0]}</p></div>`
        )
      }
    }
  })
)

function checkout() {
  var now = new Date(Date.now());

  $.ajax({
    url: `https://serene-garden-30886.herokuapp.com/empty`,
    type: "GET",
    success: (data) => {
      console.log(data);
    }
  })

  $.ajax({
    url: `https://serene-garden-30886.herokuapp.com/past_orders`,
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
