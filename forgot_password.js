async function forgot(event) {
  try {
    event.preventDefault();
    const email = event.target.email.value;
    console.log(email);
    const obj = {
      email: email,
    };
    const data = await axios.post(
      "http://localhost:3000/password/forgotpassword",
      obj
    );
    document.body.innerHTML = `${data.data.html}`;
  } catch (err) {
    console.log(err);
    alert("somthing went wrong");
  }
}
