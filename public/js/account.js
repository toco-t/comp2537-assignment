$(document).ready(
  $.ajax({
    url: `https://serene-garden-30886.herokuapp.com/account`,
    type: "GET",
    success: (data) => {
      $("#account__name").html(data.username);
      $("#account__id").html(data.user_id);

      if (data.timeline.length > 0) {
        for (let i = 0; i < data.timeline.length; i++) {
          $(".account__timeline").append(
            `<div class="account__timeline__event"><p>${data.timeline[i].content}</p>
            <p>Time: ${(data.timeline[i].time).split("GMT")[0]}</p></div>`
          )
        }
      }

      if (data.past_orders.length > 0) {
        for (let i = 0; i < data.past_orders.length; i++) {
          $(".account__past-orders").append(
            `<div class="account__past-orders__order"><p>&#165;${data.past_orders[i].total}</p>
            <p>Number of Pokemon: ${data.past_orders[i].quantity}</p>
            <p>Time: ${(data.past_orders[i].time).split("GMT")[0]}</p></div>`
          )
        }
      }
    }
  })
)
