export class AppError extends Error {
  public readonly statusCode: number
  public readonly code: string
  public readonly isOperational: boolean

  constructor(message: string, statusCode = 500, code = "INTERNAL_SERVER_ERROR", isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export const errorHandler = {
  handleError: (error: Error | AppError) => {
    // Log error for monitoring
    console.error("Application error:", error)

    // In production, you would send this to a logging service
    if (process.env.NODE_ENV === "production") {
      // Example: Sentry.captureException(error)
    }

    // Return appropriate response based on error type
    if (error instanceof AppError) {
      return {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
      }
    }

    // For unknown errors, return a generic error
    return {
      message: "An unexpected error occurred",
      code: "INTERNAL_SERVER_ERROR",
      statusCode: 500,
    }
  },

  isOperationalError: (error: Error | AppError): boolean => {
    if (error instanceof AppError) {
      return error.isOperational
    }
    return false
  },
}
