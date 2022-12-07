function save(event) {
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

  async function postDetails() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/save", obj, {
        headers: { Authorization: token },
      });
      showUsers(res.data.newUserDetails);
    } catch (e) {
      console.log("somthing went wrong");
    }
  }
  postDetails();
}
window.addEventListener("DOMContentLoaded", () => {
  async function getDetails() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.get("http://localhost:3000/showExpences", {
        headers: { Authorization: token },
      });
      for (let i = 0; i < res.data.newUserDetails.length; i++) {
        showUsers(res.data.newUserDetails[i]);
      }
    } catch (e) {
      console.log(e + "somthing went wrong");
    }
  }
  getDetails();
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

function deleteU(delID) {
  async function userDelete() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:3000/${delID}`, {
        headers: { Authorization: token },
      });
      alert(`${res.data.msg}`);
    } catch (e) {
      console.log(e + "somthing went wrong");
    }
  }
  userDelete();
  removeFromScreen(delID);
}

function removeFromScreen(delID) {
  let pareNode = document.getElementById("listofuser");
  let li = document.getElementById(delID);
  if (delID) {
    pareNode.removeChild(li);
  }
}
////////////////////////////////////////////////////////////////
document.getElementById("rzp-button1").onclick = async function (e) {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:3000/premiummembership", {
    headers: { Authorization: token },
  });
  console.log(response);
  var options = {
    key: response.data.rzp_test_ehrXSUV8GZRiuh,
    mTXoALuTkaEDS1jXdM6kLQmq, // Enter the Key ID generated from the Dashboard
    name: "Test Company",
    order_id: response.data.order.id, // For one time payment
    prefill: {
      name: "Test User",
      email: "test.user@example.com",
      contact: "7003442036",
    },
    theme: {
      color: "#3399cc",
    },
    // This handler function will handle the success payment
    handler: function (response) {
      console.log(response);
      const token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:3000/updatetransactionstatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        )
        .then(() => {
          alert("You are a Premium User Now");
        })
        .catch(() => {
          alert("Something went wrong. Try Again!!!");
        });
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on("payment.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
};
