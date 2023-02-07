const { Router } = require("express");
const router = Router();

// Middlewares
// const authenticateUser = require("../middlewares/authenticate_user");

// Controllers
const controller = require("../controllers/product");

// Routes
router.route('/add').get(controller.get)
router.route('/getOne').get(controller.getOne)

module.exports = router;
