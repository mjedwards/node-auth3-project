const express = require("express");
// const session = require("express-session");

const employeeRouter = require("./employees/employeeRouter");
const server = express();

// const sessionConfig = {
//   name: "Golden",
//   secret: "between you and me, dont tell noooooobody!",
//   cookie: {
//     maxAge: 1000 * 30,
//     secure: false,
//     httpOnly: true
//   },
//   resave: false,
//   saveUnintialized: false
// };
// server.use(session(sessionConfig));
server.use(express.json());
server.use("/api", employeeRouter);

module.exports = server;
