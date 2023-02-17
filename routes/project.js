const { Router } = require("express");
const router = Router();

// Middlewares
// const authenticateUser = require("../middlewares/authenticate_user");

// Controllers
const controller = require("../controllers/project");

// Routes
router.route("/add").post(controller.create);
router.route("/").get(controller.getAll);
router.route("/:name").get(controller.getOne);

module.exports = router;
