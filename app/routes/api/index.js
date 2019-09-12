const router = require("express").Router();
const userRoutes = require("./users");
const parseRoutes = require("./parseSort");

// Index serves as directory for routes

// User routes
router.use("/users", userRoutes);

// Export parse sorter
router.use("/parseXml", parseRoutes);

module.exports = router;
// http://localhost:3001/api/parseXml/sb31038