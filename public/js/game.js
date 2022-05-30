var pairs = 0;

var rows = 2;
var columns = 3;

var firstCard = undefined;
var secondCard = undefined;

var inPlay = false;
var locked = false;


$(document).ready(() => {
  $(".grid__card").on("click", function(event) {
    if (locked) return;

    $(this).toggleClass("__active");

    if (!inPlay) {
      firstCard = $(this).children()[0];
      $(this).toggleClass("__selected");
      inPlay = true;
    } else {
      secondCard = $(this).children()[0];
      $(this).toggleClass("__selected");
      inPlay = false;
      locked = true;

      if ($(firstCard).attr("src") == $(secondCard).attr("src")) {
        pairs ++;
        $(".__selected").off("click");
        $(".__selected").off("click");
        $(".__selected").removeClass("__selected");
        $(".__selected").removeClass("__selected");
        locked = false;
      } else {
        setTimeout(() => {
          $(".__selected").removeClass("__active");
          $(".__selected").removeClass("__active");
          $(".__selected").removeClass("__selected");
          $(".__selected").removeClass("__selected");
        }, 2000);
        locked = false;
      }
    }
  });
})
