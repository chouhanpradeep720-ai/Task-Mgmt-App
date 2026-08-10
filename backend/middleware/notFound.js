// middleware/notFound.js
// Catches any request that doesn't match a defined route.

function notFound(req, res, next) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

module.exports = notFound;
