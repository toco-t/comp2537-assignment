function containsWhitespace(string) {
      let re = /\s/;
      return re.test(string);
}

function register() {
  let username = $("#username").val();
  let email = $("#email").val();
  let password = $("#password").val();

  if (containsWhitespace(username) || containsWhitespace(email) || containsWhitespace(password)){
    alert("NO WHITESPACE ALLOWED FOR INPUTS...");
  } else if (username == "" || email == "" || password =="") {
    alert("CREDENTIAL(S) NOT FOUND...");
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
        alert("REGISTRATION SUCCESSFUL...");
      }
    })
  }
}
