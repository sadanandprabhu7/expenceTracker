window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/ispre", {
      headers: { Authorization: token },
    });

    if (res.data.data) {
      getUserDetails();
    }
  } catch (err) {
    console.log(err);
    alert("somthing went wrong");
  }
});
async function getUserDetails() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3000/leadership", {
      headers: { Authorization: token },
    });
    const leadershipTable = document.getElementById("newTr");
    const sortable = res.data.data.sort(function (a, b) {
      return b.Total - a.Total;
    });
    sortable.forEach((user) => {
      const newTr = `<tr><td><button id="userbutton" onclick=show('${user._id}') >${user.name}</button></td><td>${user.Total}</td></tr>`;
      leadershipTable.innerHTML += newTr;
    });
  } catch (err) {
    console.log(err);
    alert("somthing went wrong");
  }
}
async function show(id) {
  try {
    const table = document.getElementById("seethem");
    const token = localStorage.getItem("token");
    const res = await axios.get(`http://localhost:3000/details/${id}`, {
      headers: { Authorization: token },
    });
    table.innerHTML = "";
    const expenceDetails = res.data.data;
    expenceDetails.forEach((data) => {
      let tr = `<tr><th>AMOUNT </th>
        <th>DESCRIPTION</th>
        <th>CATEGORY</th>
    </tr>
        <tr><td>${data.expense} </td>
  <td>${data.description}</td>
  <td>${data.category}</td>`;
      table.innerHTML += tr;
    });
  } catch (err) {
    console.log(err);
    alert("somthing went wrong");
  }
}
