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
          <p>${data.timeline[i].time}</p></div>`
        )
      }
    }
  })
)
