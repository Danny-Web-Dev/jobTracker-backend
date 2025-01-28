class ServerError extends Error {
    public statusCode: number;
    public additionalData?: string;

    constructor(message: string, statusCode: number, additionalData?: string) {
        super(message);
        this.statusCode = statusCode;
        this.additionalData = additionalData;

        // Maintain proper stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ServerError;
