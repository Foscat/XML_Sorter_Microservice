const router = require("express").Router();
const userRoutes = require("./users");
const parseRoutes = require("./parseSort");
const timeRoutes = require("./stepTimes");
const fileSwitchRoutes = require("./fileSwitch");

// Index serves as directory for routes

// User routes
router.use("/users", userRoutes);

// Export parse sorter
router.use("/parseXml", parseRoutes);

// Step session calculator
router.use("/stepCalculator", timeRoutes);

// File number getter
router.use("/getFileNum", fileSwitchRoutes);

module.exports = router;
// http://localhost:3001/api/parseXml/sb31038