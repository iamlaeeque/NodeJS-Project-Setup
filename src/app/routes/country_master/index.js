const express = require("express");
const router = express.Router();
const countryController = require("../../controllers/country_master");

router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Good Afternoom!",
  });
});

router.post("/getModelData", countryController.getModelData);
router.post("/setModelData", countryController.setModelData);
router.post("/fetchData", countryController.fetchData);
router.post("/removeModelData", countryController.remvoeModelData);

module.exports = router;
