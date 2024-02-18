const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

// body-parser
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.json());
app.use("/", require("../src/app/routes"));
// app.use("/uploads", express.static(__dirname + "/uploads/"));
app.use((req, res, next) => {
  res
    .status(400)
    .send(
      `<h1> Page not found!!</h1><h4> Please Check URL - <b style="color:red">'${req.url}'</b></h4>`
    );
});
module.exports = app;
