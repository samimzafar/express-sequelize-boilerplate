const { Router } = require("express");
const router = Router();

// Routers
const productRouter = require("./product");
const orderRouter = require("./order");
const studentRouter = require("./student");
const bankRouter = require("./bank");
const devRouter = require("./dev");
const projectRouter = require("./project");

router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/banks", bankRouter);
router.use("/students", studentRouter);
router.use("/devs", devRouter);
router.use("/projects", projectRouter);

module.exports = router;
