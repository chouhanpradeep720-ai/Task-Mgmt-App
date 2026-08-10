// server.js
// Entry point — starts the HTTP server. Kept separate from app.js so app.js
// can be imported in tests without actually binding to a port.

require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
