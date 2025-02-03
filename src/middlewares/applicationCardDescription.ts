import {Request, Response, NextFunction} from 'express';
import {ApplicationCardDescription} from "../interfaces/applicationCardDescription";

const validateApplicationCardDesc = (req: Request, res: Response, next: NextFunction): void => {
    const result = ApplicationCardDescription.safeParse(req.body.description);

    if (!result.success) {
        res.status(400).json({ errors: result.error.format() });
        return;
    }

    req.body.description = result.data;
    next();
};

export {validateApplicationCardDesc};