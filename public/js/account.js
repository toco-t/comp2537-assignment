$(document).ready(
  $.ajax({
    url: `http://localhost:5000/account`,
    type: "GET",
    success: (data) => {
      $("#account__name").html(data.username);
      $("#account__id").html(data.user_id);

      for (let i = 0; i < data.timeline.length; i++) {
        $(".account__timeline").append(
          `<div class="account__timeline__event"><p>${data.timeline[i].content}</p>
          <p>Time: ${data.timeline[i].time.split("GMT")[0]}</p></div>`
        )
      }

      for (let i = 0; i < data.past_orders.length; i++) {
        $(".account__past-orders").append(
          `<div class="account__past-orders__order"><p>&#165;${data.past_orders[i].total}</p>
          <p>Number of Pokemon: ${data.past_orders[i].quantity}</p>
          <p>Time: ${data.timeline[i].time.split("GMT")[0]}</p></div>`
        )
      }
    }
  })
)
