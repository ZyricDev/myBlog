import { createLogger, format, transports } from "winston";

import config from "../../config/env.js";

const isProduction = config.app.nodeEnv === "production";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: !isProduction }),
    format.json(),
  ),
  transports: [new transports.Console()],
});

export default logger;
