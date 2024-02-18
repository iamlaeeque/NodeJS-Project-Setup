const http = require("http");
const app = require("./src/app");
const server = http.createServer(app);
var env = process.env.NODE_ENV || "development";
var config = require("./src/app/config/config.json")[env];
const PORT = config.PORT || 3000;
const { sequelize } = require("./src/app/models");
const cors = require("cors");

app.use(cors());

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error synchronizing models:", error);
  });
