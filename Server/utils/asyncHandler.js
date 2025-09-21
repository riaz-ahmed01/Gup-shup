

export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
}

// This utility function wraps asynchronous route handlers to catch errors and pass them to the next middleware.
// It helps to avoid repetitive try-catch blocks in each async route handler.
// Usage example:
