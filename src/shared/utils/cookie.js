import config from "../../config/env.js";

const setTokenCookie = (res, nameCookie, token, maxAge) => {
  res.cookie(`${nameCookie}`, token, {
    httpOnly: true,
    secure: config.app.nodeEnv === "production",
    sameSite: "Strict",
    maxAge,
  });
};

export default { setTokenCookie };
