const { Router } = require("express");
const router = Router();

// Routers
const devRouter = require("./dev");
const projectRouter = require("./project");
const userRouter = require("./user");

//Routes
router.use("/devs", devRouter);
router.use("/projects", projectRouter);
router.use("/users", userRouter);

module.exports = router;
