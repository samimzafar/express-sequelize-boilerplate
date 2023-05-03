const express = require("express");
const expressLogger = require("express-bunyan-logger");
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./utils/errorHandler");

require("./models");

process.on("uncaughtException", (e) => {
  console.log(e);
});

const app = express();

app.use(
  express.json({
    inflate: true, // Enables handling deflated (compressed) bodies; when disabled, deflated bodies are rejected.
    limit: "10mb", // Controls the maximum request body size. Default unit is number of bytes,
    strict: true, //	Enables only accepting arrays and objects
  })
);
app.use(
  express.urlencoded({
    inflate: true,
    limit: "10mb",
    extended: true,
  })
);
app.use(
  expressLogger({
    excludes: [
      "headers",
      "req",
      "user-agent",
      "short-body",
      "http-version",
      "req-headers",
      "res-headers",
      "body",
      "res",
    ], // remove extra details from log
  })
);
app.use(cors());

// routes
app.use("/api", router);

// catch 404
// app.use((req, res) => {
//   return res.status(404).send({
//     status: 404,
//     success: false,
//     message: `Cannot ${req.method} ${req.url}`,
//   });
// });

// error handling
// app.use((err, req, res, next) => {
//   // for now log the error and return 500; need to handle it differently in future
//   if (res.headersSent) {
//     return next(err);
//   }
//   req.log.error(err);
//   return res.status(err.status || 500).send({
//     status: err.status || 500,
//     success: false,
//     message: err.message,
//   });
// });
app.use(errorHandler);

module.exports = app;
