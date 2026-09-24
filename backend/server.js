// server.js
// Entry point — starts the HTTP server.

require("dotenv").config();

const app = require("./app");
const createAdmin = require("./database/createAdmin");

const PORT = process.env.PORT || 5000;

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function startServer() {
  const maxRetries = 10;
  const retryDelay = 3000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `🔄 Database initialization attempt ${attempt}/${maxRetries}...`
      );

      await createAdmin();

      console.log("✅ Database initialization completed.");

      app.listen(PORT, "0.0.0.0", () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });

      return;
    } catch (error) {
      console.error(
        `❌ Database initialization failed: ${error.message}`
      );

      if (attempt < maxRetries) {
        console.log(
          `⏳ Retrying in ${retryDelay / 1000} seconds...`
        );

        await sleep(retryDelay);
      }
    }
  }

  console.error(
    "❌ Application failed to initialize after all retry attempts."
  );

  process.exit(1);
}

startServer();