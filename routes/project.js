const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/project");

// Routes
router.route("/add").post(controller.create);
router.route("/").get(controller.getAll);
router.route("/:name").get(controller.getOne);

module.exports = router;
