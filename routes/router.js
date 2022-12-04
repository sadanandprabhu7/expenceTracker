const path = require("path");

const express = require("express");

const mainController = require("../controllers/expenceMain");

const signUpcontroller = require("../controllers/user_con");
const loginController = require("../controllers/login_con");

const router = express.Router();

router.post("/save", mainController.addDetails);

router.get("/", mainController.showDeails);

router.delete("/:id", mainController.deleteDeails);

router.post("/signUp", signUpcontroller.signUp);
router.post("/login", loginController.userLogin);

module.exports = router;
