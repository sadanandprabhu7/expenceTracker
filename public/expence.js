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
    alert(`${res.data.msg}`);

    document.getElementById("expence").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
    // showUsers(res.data.newUserDetails);
  } catch (e) {
    console.log("somthing went wrong");
  }
}

// const pagination = document.getElementById("pagination");
let pareNode = document.getElementById("expenceDetails");

// document.getElementById("myBtn").addEventListener("click", async () => {
//   try {
//     const limit = document.getElementById("val").value;
//     const token = localStorage.getItem("token");
//     const page = 1;

//     const res = await axios.get(
//       `http://localhost:3000/user/showExpences?page=${page}`,
//       {
//         headers: { Authorization: token, limit: limit },
//       }
//     );

//     expenceList(res.data);
//     showUsers(res.data.expences);
//   } catch (err) {
//     console.log(err);
//     alert("somthing went wrong");
//   }
// });
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const page = 1;
    let res = await axios.get(
      `http://localhost:3000/user/showExpences`,
      // `http://localhost:3000/user/showExpences?page=${page}`,

      {
        headers: { Authorization: token },
      }
    );

    document.getElementById("downloadFile").style.visibility = "hidden";
    document.getElementById("h1").innerHTML = ` ${res.data.name} `;
    if (res.data.ispre) {
      //   allDownload();
      //   expenceList(res.data);
      showUsers(res.data.data);
      document.body.style.backgroundColor = "#3399cc";
      document.getElementById("rzp-button1").style.visibility = "hidden";
      document.getElementById("downloadFile").style.visibility = "visible";
    }
  } catch (e) {
    console.log(e + "somthing went wrong");
  }
});

function showUsers(users) {
  document.getElementById("expence").value = "";
  document.getElementById("description").value = "";
  document.getElementById("category").value = "";
  pareNode.innerHTML = "";
  users.forEach((users) => {
    let tr = `<tr id=${users._id}><td>${users.expense} </td>
  <td>${users.description}</td>
  <td>${users.category}</td>
  <td><button class="button3" onclick=edit('${users.expense}','${users.description}','${users.category}','${users._id}')>Edit</button>  </td>
  <td> <button class="button2" onclick=deleteU('${users._id}')>Delete</button>  </td>
  </tr>`;
    pareNode.innerHTML = pareNode.innerHTML + tr;
  });
}

function edit(expenceU, descriptionU, categoryU, userID) {
  document.getElementById("expence").value = expenceU;
  document.getElementById("description").value = descriptionU;
  document.getElementById("category").value = categoryU;

  deleteU(userID);
}

async function deleteU(delID) {
  try {
    const expenseId = delID;
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `http://localhost:3000/user/delete`,
      { id: expenseId },
      {
        headers: { Authorization: token },
      }
    );
    alert(`${res.data.msg}`);
    removeFromScreen(delID);
  } catch (err) {
    console.log(err);
  }
}

function removeFromScreen(delID) {
  document.getElementById(delID).remove();

  // let pareNode = document.getElementById("listofuser");
  // let li = document.getElementById(delID);
  // if (delID) {
  //   pareNode.removeChild(li);
  // }
}
// async function download() {
//   try {
//     const token = localStorage.getItem("token");
//     const data = await axios.get("http://localhost:3000/user/download", {
//       headers: { Authorization: token },
//     });
//     const url = data.data.data;
//     if (data.status === 200) {
//       var a = document.createElement("a");
//       a.href = url;
//       a.download = "myexpense.csv";
//       a.click();
//     } else {
//       throw new Error(data.data.message);
//     }
//   } catch (err) {
//     console.log(err);
//     alert("somthing went wrong");
//   }
// }

// async function allDownload() {
//   try {
//     const token = localStorage.getItem("token");
//     const data = await axios.get("http://localhost:3000/user/allDownload", {
//       headers: { Authorization: token },
//     });
//     const pli = document.getElementById("download");
//     data.data.data.forEach((url) => {
//       const li = `<li><a href=${url.url}>${url.createdAt}</a></li>`;
//       pli.innerHTML += li;
//     });
//   } catch (err) {
//     console.log(err);
//     alert("somthing went wrong");
//   }
// }

// function expenceList({
//   currentPage,
//   hasNextPage,
//   nextPage,
//   hasPreviousPage,
//   priviousPage,
//   lastPage,
// }) {
//   pagination.innerHTML = "";

//   if (currentPage !== 1 && priviousPage !== 1) {
//     const btn1 = document.createElement("button");
//     btn1.innerHTML = 1;
//     btn1.addEventListener("click", () => getExpences(1));
//     pagination.appendChild(btn1);
//   }
//   if (hasPreviousPage) {
//     const btn2 = document.createElement("button");
//     btn2.innerHTML = priviousPage;
//     btn2.addEventListener("click", getExpences(priviousPage));
//     pagination.appendChild(btn2);
//   }
//   const btn1 = document.createElement("button");
//   btn1.innerHTML = `<h3>${currentPage}</h3>`;
//   btn1.addEventListener("click", () => getExpences(currentPage));
//   pagination.appendChild(btn1);

//   if (hasNextPage) {
//     const btn3 = document.createElement("button");
//     btn3.innerHTML = nextPage;
//     btn3.addEventListener("click", () => getExpences(nextPage));
//     pagination.appendChild(btn3);
//   }
//   if (lastPage !== currentPage && nextPage !== lastPage) {
//     const btn4 = document.createElement("button");
//     btn4.innerHTML = "Last Page";
//     btn4.addEventListener("click", () => getExpences(lastPage));
//     pagination.appendChild(btn4);
//   }
// }

// async function getExpences(page) {
//   try {
//     const token = localStorage.getItem("token");
//     let res = await axios.get(
//       `http://localhost:3000/user/showExpences?page=${page}`,
//       {
//         headers: { Authorization: token },
//       }
//     );
//     expenceList(res.data);
//     showUsers(res.data.expences);
//   } catch (err) {
//     console.log(err);
//     alert("somthing went wrong");
//   }
// }
