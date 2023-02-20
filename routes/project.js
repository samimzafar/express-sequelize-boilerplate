const { Router } = require("express");
const router = Router();

// Middlewares
// const authenticateUser = require("../middlewares/authenticate_user");

// Controllers
const { project: { create, getAll, getOne } } = require("../controllers");

// Routes
router.route("/add").post(create);
router.route("/").get(getAll);
router.route("/:name").get(getOne);

module.exports = router;
