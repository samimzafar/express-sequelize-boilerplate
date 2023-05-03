const sequelize = require("sequelize");

module.exports = (err, req, res, next) => {
  console.log("🚀 ~ file: errorHandler.js:4 ~ err:", err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Something went wrong";
  // log the error to the console
  req.log.error("GLOBAL ERROR HANDLER MW", err.stack);
  if (res.headersSent) {
    return next(err);
  }
  // check if a transaction is in progress
  if (req.transaction && req.transaction instanceof sequelize.Transaction) {
    // roll back the transaction
    req.transaction.rollback().then(() => {
      // send response to the client
      return res.status(status).send(message);
    });
  } else {
    console.log("ELSE status:", status);
    console.log("ELSE message:", message);
    // send response to the client
    return res.status(status).json({ message });
  }
};
