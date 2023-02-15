const { Router } = require("express");
const router = Router();

// Middlewares
// const authenticateUser = require("../middlewares/authenticate_user");

// Controllers
const controller = require("../controllers/project");

// Routes
router.route("/add").post(controller.create);

module.exports = router;
