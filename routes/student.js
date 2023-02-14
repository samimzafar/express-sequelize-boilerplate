const { Router } = require("express");
const router = Router();

// Middlewares
// const authenticateUser = require("../middlewares/authenticate_user");

// Controllers
const controller = require("../controllers/student");

// Routes
router.route("/add").post(controller.add);
router.route("/getOne").get(controller.getOne);

module.exports = router;
