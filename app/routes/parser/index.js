const router = require("express").Router();
const parseRoutes = require("./parseSort");

// Export parse sorter
router.use("/parseXml", parseRoutes);

module.exports = router;