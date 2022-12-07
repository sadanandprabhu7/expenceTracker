const path = require("path");

const express = require("express");

const mainController = require("../controllers/expenceMain");

const signUpcontroller = require("../controllers/user_con");
const loginController = require("../controllers/login_con");

const purchaseController = require("../controllers/payment_con");

const userAuthorization = require("../middleware/authorization");

const router = express.Router();

router.post("/save", userAuthorization.authenticate, mainController.addDetails);

router.get(
  "/showExpences",
  userAuthorization.authenticate,
  mainController.showDeails
);

router.delete(
  "/:id",
  userAuthorization.authenticate,
  mainController.deleteDeails
);

router.post("/signUp", signUpcontroller.signUp);
router.post("/login", loginController.userLogin);

router.get(
  "/premiummembership",
  userAuthorization.authenticate,
  purchaseController.purchasepremium
);

router.post(
  "/updatetransactionstatus",
  userAuthorization.authenticate,
  purchaseController.updateTransactionStatus
);

router.post("/findEmail", loginController.findEmail);

module.exports = router;
