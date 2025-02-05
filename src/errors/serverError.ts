class ServerError extends Error {
    public errorCode: number;
    public additionalData?: string;

    constructor(message: string, errorCode: number, additionalData?: string) {
        super(message);
        this.errorCode = errorCode;
        this.additionalData = additionalData;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ServerError;
