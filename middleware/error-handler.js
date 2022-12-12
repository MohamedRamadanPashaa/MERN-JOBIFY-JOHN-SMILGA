import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong please try again later!",
  };

  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;

    defaultError.msg =
      Object.values(err.errors)
        .map((el) => el.message)
        .join(", ") + ".";
  }

  // Duplicated field
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;

    defaultError.msg = `This ${Object.keys(err.keyValue)}: ${Object.values(
      err.keyValue
    )} is already exist, Please provide another ${Object.keys(err.keyValue)}.`;
  }

  if (err.name === "CastError") {
    defaultError.statusCode = StatusCodes.NOT_FOUND;
    defaultError.msg = `Invalid ${err.path}: ${err.value}.`;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
