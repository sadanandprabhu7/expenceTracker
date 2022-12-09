async function save(event) {
  event.preventDefault();
  let expence = event.target.expence.value;
  let description = event.target.description.value;
  let category = event.target.category.value;

  if (expence == "" || description == "" || category == "") {
    return alert("Please fill all Details");
  }

  const obj = {
    expence,
    description,
    category,
  };

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post("http://localhost:3000/user/save", obj, {
      headers: { Authorization: token },
    });
    showUsers(res.data.newUserDetails);
  } catch (e) {
    console.log("somthing went wrong");
  }
}
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    let res = await axios.get("http://localhost:3000/user/showExpences", {
      headers: { Authorization: token },
    });
    if (res.data.ispre) {
      document.body.style.backgroundColor = "#3399cc";
      document.getElementById("rzp-button1").style.visibility = "hidden";
      document.getElementById(
        "h1"
      ).innerHTML = `<h3> PREMIUM ACCOUNT ${res.data.name} </h3>`;
    }
    for (let i = 0; i < res.data.newUserDetails.length; i++) {
      showUsers(res.data.newUserDetails[i]);
    }
  } catch (e) {
    console.log(e + "somthing went wrong");
  }
});

function showUsers(users) {
  document.getElementById("expence").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";

  let pareNode = document.getElementById("listofuser");
  let li = `<li id=${users.id}>${users.expence} - ${users.description} - ${users.category}
            <button onclick=edit('${users.expence}','${users.description}','${users.category}','${users.id}')>Edit</button>    
            <button onclick=deleteU('${users.id}')>Delete</button>    
            </li>`;

  pareNode.innerHTML = pareNode.innerHTML + li;
}

function edit(expenceU, descriptionU, categoryU, userID) {
  document.getElementById("expence").value = expenceU;
  document.getElementById("description").value = descriptionU;
  document.getElementById("category").value = categoryU;

  deleteU(userID);
}

async function deleteU(delID) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`http://localhost:3000/user/${delID}`, {
      headers: { Authorization: token },
    });
    alert(`${res.data.msg}`);
  } catch (e) {
    console.log(e + "somthing went wrong");
  }

  removeFromScreen(delID);
}

function removeFromScreen(delID) {
  let pareNode = document.getElementById("listofuser");
  let li = document.getElementById(delID);
  if (delID) {
    pareNode.removeChild(li);
  }
}
async function download() {
  const token = localStorage.getItem("token");
  const data = await axios.get("http://localhost:3000/user/download", {
    headers: { Authorization: token },
  });

  const url = data.data.data;
  if (data.status === 200) {
    var a = document.createElement("a");

    a.href = url;
    a.download = "myexpense.txt";
    a.click();
  } else {
    throw new Error(data.data.message);
  }
}
