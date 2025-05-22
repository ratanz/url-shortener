
export const errorHandler = (err, req, res, next) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};

export class AppError extends Error {
    statusCode;
    isOperational;

    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}

export class BadRequestError extends AppError {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = 'Forbidden') {
        super(message, 403);
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Conflict') {
        super(message, 409);
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Validation Error') {
        super(message, 422);
    }
}

export class InternalServerError extends AppError {
    constructor(message = 'Internal Server Error') {
        super(message, 500);
    }
}

export class ServiceError extends AppError {
    constructor(message = 'Service Error') {
        super(message, 500);
    }
}

export class DatabaseError extends AppError {
    constructor(message = 'Database Error') {
        super(message, 500);
    }
}









