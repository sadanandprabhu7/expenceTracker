window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  axios
    .get("http://localhost:3000/ispre", {
      headers: { Authorization: token },
    })
    .then((res) => {
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
      const userName = document.getElementById("listofuser");

      res.data.data.forEach((user) => {
        const name = `
        <li><button onclick=show(${user.id}) >${user.name}</button></li>`;
        userName.innerHTML += name;
      });
    });
}
function show(id) {
  const table = document.getElementById("seethem");
  const token = localStorage.getItem("token");
  axios
    .get(`http://localhost:3000/details/${id}`, {
      headers: { Authorization: token },
    })
    .then((res) => {
      table.innerHTML = "";
      const expenceDetails = res.data.data;

      for (let i = 0; i < expenceDetails.length; i++) {
        let tr = `<tr><th>AMOUNT </th>
        <th>DESCRIPTION</th>
        <th>CATEGORY</th>
    </tr> 
        <tr><td>${expenceDetails[i].expence} </td>
  <td>${expenceDetails[i].description}</td>
  <td>${expenceDetails[i].category}</td>`;
        table.innerHTML += tr;
      }
    });
}
