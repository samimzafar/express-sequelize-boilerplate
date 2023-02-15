const { Router } = require("express");
const router = Router();

// Middlewares
// const authenticateUser = require("../middlewares/authenticate_user");

// Controllers
const controller = require("../controllers/dev");

// Routes
router.route("/add").post(controller.create);
router.route("/find-dev-project").get(controller.findDevProject);

module.exports = router;
