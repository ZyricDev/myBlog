import config from "../../config/env.js";

const setTokenCookie = (res, nameCookie, token) => {
  let maxAgeInMilliseconds;
  if (nameCookie === "accessToken") {
    maxAgeInMilliseconds = config.auth.accessTokenExpiresIn * 60 * 1000;
  } else {
    maxAgeInMilliseconds =
      config.auth.refreshTokenExpiresIn * 24 * 60 * 60 * 1000;
  }

  res.cookie(nameCookie, token, {
    httpOnly: true,
    secure: config.app.nodeEnv === "production",
    sameSite: "strict",
    maxAge: maxAgeInMilliseconds,
  });
};

export default { setTokenCookie };
