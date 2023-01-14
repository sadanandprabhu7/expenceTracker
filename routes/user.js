const path = require("path");
const express = require("express");
const router = express.Router();
const mainController = require("../controllers/expenceMain");

const UserController = require("../controllers/user");
const userAuthorization = require("../middleware/authorization");

router.post("/save", userAuthorization.authenticate, mainController.addDetails);

router.get(
  "/showExpences",
  userAuthorization.authenticate,
  mainController.showDeails
);

router.post(
  "/delete",
  userAuthorization.authenticate,
  mainController.deleteDeails
);

router.post("/signUp", UserController.signUp);
router.post("/login", UserController.userLogin);

// router.get(
//   "/download",
//   userAuthorization.authenticate,
//   mainController.downloadExpence
// );

// router.get(
//   "/allDownload",
//   userAuthorization.authenticate,
//   mainController.allDownload
// );

module.exports = router;
