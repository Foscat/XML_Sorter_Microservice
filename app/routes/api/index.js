const router = require("express").Router();
const userRoutes = require("./users");
const parseRoutes = require("./parseSort");
const timeRoutes = require("./stepTimes");

// Index serves as directory for routes

// User routes
router.use("/users", userRoutes);

// Export parse sorter
router.use("/parseXml", parseRoutes);

router.use("/stepCalculator", timeRoutes);

module.exports = router;
// http://localhost:3001/api/parseXml/sb31038