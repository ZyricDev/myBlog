import AppError from "../AppError";

const notFoundHandler = (req, res, next) => {
  if (req.accepts("json") && req.originalUrl.startsWith("/api")) {
    throw new AppError(`Cannot find ${req.originalUrl} on this server!`, 404);
  } else if (req.accepts("html")) {
    return res.status(404).render("404", {
      pageTitle: "Not found",
      path: req.url,
    });
  }

  res.status(404).type("txt").send("Not Found");
};

export default notFoundHandler;
