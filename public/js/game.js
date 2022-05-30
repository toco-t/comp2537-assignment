var pairs = 0;

var rows = 2;
var columns = 3;

var gameIsOn = false;
var locked = false;
var firstCard = undefined;
var secondCard = undefined;

function flipCard(id) {
  if (!gameIsOn) return;
  if (locked) return;
  $(`#${id}`).toggleClass("__active");

  if (firstCard == undefined) {
    firstCard = id;
  } else if (firstCard == id){
    $(`#${id}`).toggleClass("__active")
    firstCard = undefined;
  } else if (secondCard == undefined){
    locked = true;
    secondCard = id;

    if ($(`#${firstCard} .grid__card__front`).attr("src") == $(`#${secondCard} .grid__card__front`).attr("src")) {
      setTimeout(() => {
        pairs ++;
        $(`#${firstCard}`).off("click");
        $(`#${secondCard}`).off("click");
        firstCard = undefined;
        secondCard = undefined;
        locked = false;
      }, 1000);
    } else {
      setTimeout(() => {
        $(`#${firstCard}`).removeClass("__active");
        $(`#${secondCard}`).removeClass("__active");
        firstCard = undefined;
        secondCard = undefined;
        locked = false;
      }, 2000);
    }
  }
}

$(document).ready(() => {
  $(".grid__card").each((card) => {
    let position = Math.floor(Math.random() * (rows * columns));
    $(`#${card}`).css("order", position);
  });

  $(".grid__card").on("click", function(event) {
    gameIsOn = true;
    flipCard(this.id);
  });
})
