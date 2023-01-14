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
    const sortable = res.data.totalAmount.sort(function (a, b) {
      return b.total_amount - a.total_amount;
    });
    sortable.forEach((val) => {
      res.data.data.forEach((user) => {
        if (val.userId == user.id) {
          const newTr = `<tr><td><button id="userbutton" onclick=show(${user.id}) >${user.name}</button></td><td>${val.total_amount}</td></tr>`;
          leadershipTable.innerHTML += newTr;
        }
      });
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
  } catch (err) {
    console.log(err);
    alert("somthing went wrong");
  }
}
