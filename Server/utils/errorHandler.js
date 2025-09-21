class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }

}
export const errorHandler = ErrorHandler;



// This custom error class extends the built-in Error class in JavaScript
// to include an HTTP status code along with the error message.
// It can be used throughout the application to create consistent error      objects
// that can be handled by error-handling middleware.
