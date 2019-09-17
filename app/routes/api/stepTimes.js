const router = require("express").Router();
const stepTimeController = require("../../controllers/sessionCompleted");

router
    .route("/")
        .post(stepTimeController.sessionCompleted)

module.exports = router;