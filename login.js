async function loginUser(event) {
  event.preventDefault();
  try {
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (email == "" || password == "") {
      return alert("please fill all details");
    }
    const obj = {
      email,
      password,
    };
    const response = await axios.post("http://localhost:3000/login", obj);
    if (response.status == 200) {
      alert(`${response.data.msg}`);
    }
  } catch (err) {
    console.log(err);
    alert(
      `${err.response.data.msg} status code : ${err.response.request.status}`
    );
    event.target.email.value = "";
    event.target.password.value = "";
  }
}
