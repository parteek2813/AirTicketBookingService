class AppError extends Error {
  constructor(name, message, explanation, StatusCode) {
    super();
    this.name = name;
    this.message = message;
    this.explanation = explanation;
    this.StatusCode = StatusCode;
  }
}

module.exports = AppError;
