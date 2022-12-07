async function forgot(event) {
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
}
