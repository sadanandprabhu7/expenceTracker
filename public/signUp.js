async function resgister(event) {
  event.preventDefault();
  try {
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
    console.log(obj);
    const response = await axios.post("http://localhost:3000/signUp", obj);
    console.log(response);
    alert(`${response.data.msg}`);
    event.target.name.value = "";
    event.target.email.value = "";
    event.target.password.value = "";
  } catch (err) {
    alert(`${err.response.data.msg}`);
    event.target.name.value = "";
    event.target.email.value = "";
    event.target.password.value = "";
  }
}
