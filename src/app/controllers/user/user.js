const mongoose = require("mongoose");
const config = require("../../../../config/config.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.js");

const mysql = require("mysql2");

const connection = mysql.createConnection(
  require("../../../../config/config.SAMPLE.js")
);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

exports.register = async (req, res) => {
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a user object
  const user = {
    email: req.body.email,
    name: req.body.name,
    password: hashedPassword,
    user_type_id: req.body.user_type_id,
  };

  // Insert user into the MySQL database
  connection.query("INSERT INTO users SET ?", user, (err, result) => {
    if (err) {
      console.error("Error inserting user into MySQL database: ", err);
      res.status(500).send("Error registering user");
      return;
    }

    // Create payload then generate an access token
    const payload = {
      id: result.insertId,
      user_type_id: req.body.user_type_id || 0,
    };

    const token = jwt.sign(payload, config.TOKEN_SECRET);

    res.status(200).send({ token });
  });
};

exports.login = async (req, res) => {
  const query = "SELECT * FROM users WHERE email = ?";

  connection.query(query, [req.body.email], async (err, results) => {
    if (err) {
      console.error("Error querying MySQL database: ", err);
      return res.status(500).send("Error during login");
    }

    const user = results[0];

    if (user) {
      const validPass = await bcrypt.compare(req.body.password, user.password);

      if (!validPass) {
        return res.status(401).send("Email or Password is wrong");
      }

      // Create and assign token
      const payload = { id: user.id, user_type_id: user.user_type_id };
      const token = jwt.sign(payload, config.TOKEN_SECRET);

      res.status(200).header("auth-token", token).send({ token: token });
    } else {
      res.status(401).send("Invalid email");
    }
  });
};

// Access auth users only
exports.userEvent = (req, res) => {
  let events = [
    {
      _id: "1",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "2",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "3",
      name: "Auto Expo",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
  ];
  res.json(events);
};

exports.adminEvent = (req, res) => {
  let specialEvents = [
    {
      _id: "1",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "2",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "3",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "4",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "5",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "6",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
  ];
  res.json(specialEvents);
};
