const { Router } = require("express");
const router = Router();

// Middlewares
// const authenticateUser = require("../middlewares/authenticate_user");

// Controllers
const { dev: { create, findDevProject } } = require("../controllers");

// Routes
router.route("/add").post(create);
router.route("/find-dev-project").get(findDevProject);

module.exports = router;
