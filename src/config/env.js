const config = {
  admin: {
    email: process.env.SUPER_ADMIN_EMAIL,
  },

  app: {
    port: process.env.PORT || 4000,
    nodeEnv: process.env.NODE_ENV || "development",
  },

  auth: {
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || 15, //m
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || 14, //d
  },
};

const requiredConfigVars = [
  { name: "SUPER_ADMIN_EMAIL", value: config.admin.email },
  { name: "ACCESS_TOKEN_SECRET_KEY", value: config.auth.accessTokenSecretKey },
  {
    name: "REFRESH_TOKEN_SECRET_KEY",
    value: config.auth.refreshTokenSecretKey,
  },
];

const missingVars = requiredConfigVars.filter((env) => !env.value);

if (missingVars.length > 0) {
  const missingNames = missingVars.map((env) => env.name).join("\n");

  throw new Error(
    `🔥 Server startup stopped!\n The following critical variables are not set in the .env file:\n${missingNames}`,
  );
}

export default config;
