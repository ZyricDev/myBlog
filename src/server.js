import app from "./app.js";
import config from "./config/env.js";

async function connectToDB() {}

const startServer = () => {
  const port = config.app.port;

  app.listen(port, () => {
    const mode =
      config.app.nodeEnv === "production" ? "production" : "development";

    console.log(`🚀 Server running in ${mode} mode on port ${port}`);
  });
};

async function run() {
  await connectToDB();
  startServer();
}

run();
