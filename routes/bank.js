const { Router } = require("express");
const router = Router();

// Middlewares
// const authenticateUser = require("../middlewares/authenticate_user");

// Controllers
const controller = require("../controllers/bank");

// Routes
router.route("/add").post(controller.add);
router.route("/getall").get(controller.getAll);
router.route("/getone/:name").get(controller.getOne);

module.exports = router;
