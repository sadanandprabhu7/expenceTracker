const express = require("express");

const router = express.Router();

const leaderShipCon = require("../controllers/leadership");
const userAuthorization = require("../middleware/authorization");

router.get(
  "/leadership",
  userAuthorization.authenticate,
  leaderShipCon.leaderShip
);

router.get(
  "/details/:id",
  userAuthorization.authenticate,
  leaderShipCon.details
);

router.get("/ispre", userAuthorization.authenticate, leaderShipCon.ispre);

module.exports = router;
