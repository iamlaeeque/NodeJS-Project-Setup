const express = require("express");
const router = express.Router();

router.use("/api", require("./country_master"));

module.exports = router;
