const { Router } = require("express");
const router = Router();

// Middlewares
// const authenticateUser = require("../middlewares/authenticate_user");

// Controllers
const controller = require("../controllers/order");

// Routes
router.route("/add").get(controller.add);
router.route("/get").get(controller.get);

module.exports = router;
