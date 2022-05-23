$(document).ready(
  $.ajax({
    url: `http://localhost:5000/account`,
    type: "GET",
    success: (data) => {
      $("#account__name").html(data.username);
      $("#account__id").html(data.user_id);
    }
  })
)
