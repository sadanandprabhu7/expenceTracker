function resgister(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;
  if (name == "" || email == "" || password == "") {
    return alert("please fill all details");
  }
  const obj = {
    name,
    email,
    password,
  };
  axios
    .post("http://localhost:3000/signUp", obj)
    .then((response) => {
      alert(`${response.data.msg}`);
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    })
    .catch((err) => {
      console.log(err);
    });
}
