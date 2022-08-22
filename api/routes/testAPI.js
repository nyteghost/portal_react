let express = require("express");
let router = express.Router();

router.get("/", function (req, res, next) {
    res.send("Marks API is working like a fine wine.");
});

module.exports = router