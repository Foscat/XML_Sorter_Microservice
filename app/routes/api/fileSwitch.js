const router = require("express").Router();
const finderController = require("../../controllers/fileSwitch");

router
  .route("/")
    .post(finderController.fileSwitch)

module.exports = router;