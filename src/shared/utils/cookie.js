import config from "../../config/env.js";

const setTokenCookie = (res, tokenName, token) => {
  let maxAgeInMilliseconds;
  if (tokenName === "accessToken") {
    maxAgeInMilliseconds = config.auth.accessTokenExpiresIn * 60 * 1000;
  } else {
    maxAgeInMilliseconds =
      config.auth.refreshTokenExpiresIn * 24 * 60 * 60 * 1000;
  }

  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: config.app.nodeEnv === "production",
    sameSite: "strict",
    maxAge: maxAgeInMilliseconds,
  });
};

const getTokenCookie = (req, tokenName) => {
  return req.cookies ? req.cookies[tokenName] : null;
};

export default { setTokenCookie, getTokenCookie };
