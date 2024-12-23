class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // هو هنا خلاها تبقي استرينج علشان لو لاقي انو بيبدء بقي 4 بالتالي هيكون في خطا
    this.isOperational = true;  // It means that i generate that error

    //Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
