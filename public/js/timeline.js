function allEvents() {
  $(".feed-row").html("");

  $.ajax({
    url: `http://localhost:5000/timeline/events`,
    type: "GET",
    success: (data) => {
      for (let i=0; i<data.length; i++){
        $(".feed-row").append(
          `<div class="feed">
          <h3>${data[i].content}</h3>
          <p>${data[i].time}</p>
          <p>Like: ${data[i].hits}</p>
          <button class="likes" id="${data[i]["_id"]}">Like</button>
          <button class="delete" id="${data[i]["_id"]}">Delete</button>
          </div>`
        )
      }
    },
  })
}

function likeEvent(){
  $.ajax({
    url: `http://localhost:5000/timeline/update/${this.id}`,
    type: "PUT",
    success: () => {
      console.log("Successful");
    }
  })
  allEvents();
}

function deleteEvent(){
  $.ajax({
    url: `http://localhost:5000/timeline/delete/${this.id}`,
    type: "PUT",
    success: () => {
      console.log("Successful");
    }
  })
  allEvents();
}

$(document).ready(() => {
  allEvents();

  $("body").on("click", ".likes", likeEvent)

  $("body").on("click", ".delete", deleteEvent)
})
