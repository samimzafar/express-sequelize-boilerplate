const express = require("express");
const router = express.Router({ mergeParams: true });

const controller = require("../controllers/user");
const isAdmin = require("../middlewares/isAdmin");
const { user: { validateUserRegistration } } = require("./validations");
router.get("/create", isAdmin, validateUserRegistration, controller.create);
module.exports = router;