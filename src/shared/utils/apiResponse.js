export const sendSuccess = (
  res,
  message = "success",
  data = null,
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};
