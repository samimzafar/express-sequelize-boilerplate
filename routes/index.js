const { Router } = require("express");
const router = Router();

// Routers
const devRouter = require("./dev");
const projectRouter = require("./project");

//Routes
router.use("/devs", devRouter);
router.use("/projects", projectRouter);

module.exports = router;
