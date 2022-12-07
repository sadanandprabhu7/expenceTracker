window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:3000/ispre", {
      headers: { Authorization: token },
    })
    .then((res) => {
      console.log(res);
      if (res.data.data) {
        getUserDetails();
      }
    });
});
function getUserDetails() {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:3000/leadership", {
      headers: { Authorization: token },
    })
    .then((res) => {
      console.log(res);
      const nameTd = document.getElementById("userName");

      res.data.data.forEach((user) => {
        const name = `
        <td><button onclick=show(${user.id}) >${user.name}</button></td>`;
        nameTd.innerHTML += name;
      });
    });
}
function show(id) {
  const table = document.getElementById("myItems");
  const token = localStorage.getItem("token");
  axios
    .get(`http://localhost:3000/details/${id}`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      table.innerHTML = "";
      const expenceDetails = res.data.data;

      for (let i = 0; i < expenceDetails.length; i++) {
        let li = `<li>${expenceDetails[i].expence}--
       ${expenceDetails[i].description}--
        ${expenceDetails[i].category}</li>`;
        table.innerHTML += li;
      }

      //   res.data.data.forEach((expence) => {
      //     let li = `<li>${expence.expence}--
      //     ${expence.description}--
      //     ${expence.category}</li>`;
      //     table.innerHTML += li;
      //   });
    });
}
