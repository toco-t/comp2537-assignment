function containsWhitespace(string) {
      let re = /\s/;
      return re.test(string);
}

function register() {
  let username = $("#username").val();
  let email = $("#email").val();
  let password = $("#password").val();

  if (containsWhitespace(username) || containsWhitespace(email) || containsWhitespace(password)){
    $("#sign-in__message").html("NO WHITESPACE ALLOWED FOR INPUTS...");
  } else if (username == "" || email == "" || password =="") {
    $("#sign-in__message").html("CREDENTIAL(S) NOT FOUND...");
  } else {
    $.ajax({
      url: `http://localhost:5000/register`,
      type: "POST",
      data: {
        username: username,
        email: email,
        password: password
      },
      success: (data) => {
        $("#sign-in__message").html(data);
      }
    })
  }
}

function signIn() {
  let username = $("#username").val();
  let email = $("#email").val();
  let password = $("#password").val();

  if (containsWhitespace(username) || containsWhitespace(email) || containsWhitespace(password)){
    $("#sign-in__message").html("NO WHITESPACE ALLOWED FOR INPUTS...");
  } else if (username == "" || email == "" || password =="") {
    $("#sign-in__message").html("CREDENTIAL(S) NOT FOUND...");
  } else {
    $.ajax({
      url: `http://localhost:5000/in`,
      type: "POST",
      data: {
        username: username,
        email: email,
        password: password
      },
      success: (data) => {
        if (data = "NO USER FOUND") {
          $("#sign-in__message").html("NO ACCOUNT FOUND...");
        } else {
          window.location.href = "/";
        }
      }
    })
  }
}
