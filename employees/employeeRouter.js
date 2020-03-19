const express = require("express");

const edb = require("./employeeModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const restrict = require("../middleware/auth");

const secrets = require("../config/secrets");

const router = express.Router();

router.get("/users", restrict, (req, res) => {
  edb
    .find()
    .then(info => {
      res.json(info);
    })
    .catch(err => {
      res.status(500).json({ errMessage: err, message: "Invalid credentials" });
    });
});

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  edb
    .add(user)
    .then(userInfo => {
      if (userInfo) {
        res.status(201).json(userInfo);
      } else {
        res.json({ message: "No information!" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errMessage: err, message: "You could not be registered" });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  edb
    .login({ username })
    .first()
    .then(userInfo => {
      console.log(userInfo);
      if (userInfo && bcrypt.compareSync(password, userInfo.password)) {
        const token = generateToken(userInfo);
        // req.session.username = username;
        res.status(200).json({
          welcome: userInfo.username,
          token
        });
      }
    })
    .catch(err => {
      res.status(500).json({ errMessage: err, message: "Nothing here" });
    });
});

// router.get("/logout", (req, res) => {
//   if (req.session) {
//     req.session.destroy(err => {
//       if (err) {
//         res.json({ message: "Cannot logout!" });
//       } else {
//         res.status(200).json({ message: "Logout Successful!" });
//       }
//     });
//   }
// });

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "10s"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}
module.exports = router;
