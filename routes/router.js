const path = require("path");

const express = require("express");

const mainController = require("../controllers/expenceMain");

const signUpcontroller = require("../controllers/user_con");

const router = express.Router();

router.post("/save", mainController.addDetails);

router.get("/", mainController.showDeails);

router.delete("/:id", mainController.deleteDeails);

//router.get("/:email", signUpcontroller.getEmail);
router.post("/signUp", signUpcontroller.signUp);

module.exports = router;
