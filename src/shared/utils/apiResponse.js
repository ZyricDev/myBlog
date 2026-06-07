export const sendSuccess = (
  res,
  message = "success",
  data = null,
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    status: statusCode,
    message,
    data,
  });
};
