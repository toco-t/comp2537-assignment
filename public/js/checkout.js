var TAX = 0.12;

$(document).ready(
  $.ajax({
    url: `http://localhost:5000/bag`,
    type: "GET",
    success: (data) => {
      console.log(data);

      for (let i=0; i<data.length; i++) {
        
      }
    }
  })
)
