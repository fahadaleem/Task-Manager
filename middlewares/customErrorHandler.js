class CustomErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorHandler) {
    return res.status(err.statusCode).send({
      status: "error",
      message: err.message,
    });
  }
  return res.status(500).send("Internal Server Error");
};

const createError = (message, statusCode) => {
  return new CustomErrorHandler(message, statusCode);
};

module.exports = {
  errorHandler,
  createError,
};
