const { Router } = require("express");
const router = Router();

// Routers
const productRouter = require("./product");
const orderRouter = require("./order");

router.use("/products", productRouter);
router.use("/orders", orderRouter);

module.exports = router;
