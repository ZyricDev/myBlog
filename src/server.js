import app from "./app.js";
import config from "./config/env.js";

async function connectToDB() {}

const startServer = () => {
  const port = config.app.port;

  app.listen(port, () => {
    console.log(
      `🚀 Server running in ${
        config.app.nodeEnv ? "production" : "development"
      } mode on port ${port}`,
    );
  });
};

async function run() {
  await connectToDB();
  startServer();
}

run();
