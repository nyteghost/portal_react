const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/").get(controllers.getAllAssetLocations).post(controllers.createAssetLocation);
router
 .route("/:id")
 .get(controllers.getAssetLocation)
 .put(controllers.updateAssetLocation)
//  .delete(controllers.deleteTodo);
module.exports = router;

