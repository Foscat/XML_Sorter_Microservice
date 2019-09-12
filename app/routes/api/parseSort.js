const router = require("express").Router();
const parserController = require("../../controllers/parser");

router
  .route("/:fileString")
    .get(parserController.getFile)

module.exports = router;