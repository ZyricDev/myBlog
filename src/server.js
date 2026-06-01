const app = require("./app");
const env = require("./config/env");

async function connectToDB() {}

const startServer = () => {
  const port = env.app.port;

  app.listen(port, () => {
    console.log(
      `🚀 Server running in ${
        env.app.nodeEnv ? "production" : "development"
      } mode on port ${port}`,
    );
  });
};

async function run() {
  await connectToDB();
  startServer();
}

run();
