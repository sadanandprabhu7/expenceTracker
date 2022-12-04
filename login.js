function loginUser(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  console.log("hhhhh");
  if (email == "" || password == "") {
    return alert("please fill all details");
  }
  const obj = {
    email,
    password,
  };
  axios
    .post("http://localhost:3000/login", obj)
    .then((response) => {
      if (response.status == 200) {
        alert(`${response.data.msg}`);
      }
    })
    .catch((err) => {
      console.log(err.msg);
    });
}
