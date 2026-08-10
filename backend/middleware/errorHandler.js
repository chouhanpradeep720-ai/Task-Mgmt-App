// middleware/errorHandler.js
// Catches any error passed via next(err) and returns a consistent JSON shape.

function errorHandler(err, req, res, next) {
  console.error("Unhandled error:", err.stack || err.message);
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong on the server",
  });
}

module.exports = errorHandler;
