const signUpBtn = document.getElementById("signUpBtn");

signUpBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (name == "" || email == "" || password == "") {
  } else {
    const obj = {
      name,
      email,
      password,
    };
    axios
      .post("http://localhost:3000/signUp", obj)
      .then((res) => {
        alert(`${res.data.msg}`);
        console.log(res.data.msg);
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
