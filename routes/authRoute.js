const express = require("express");
const router = express.Router();

const requireSignIn = require("../middleware/auth");
const {
  registerController,
  loginController,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
