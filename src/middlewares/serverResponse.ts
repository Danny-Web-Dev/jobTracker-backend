import { Request, Response, NextFunction } from 'express';

interface WrappedResponse<T> {
    success: boolean;
    data: T | { message: string; statusCode: string };
}

const wrapResponse = (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;
    res.json = function (body: any) {
        let wrappedBody: WrappedResponse<typeof body>;

        body = body || {};

        if (!body.statusCode) {
            wrappedBody = {
                success: true,
                data: body
            };
        } else {
            const message = body.additionalData ? body.message + ' ' + body.additionalData : body.message || 'An error occurred';

            wrappedBody = {
                success: false,
                data: {
                    message: message,
                }
            };

            if (body.statusCode >= 400 && body.statusCode < 600) {
                res.statusCode = body.statusCode;
            } else {
                wrappedBody.data.errorCode = body.statusCode;
            }
        }

        return originalJson.call(this, wrappedBody);
    };

    next();
}

export default wrapResponse;
