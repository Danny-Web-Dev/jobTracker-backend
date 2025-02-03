import {Router, Request, Response} from 'express';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import {login, register, getById} from "../services/user";
import {sendEmailValidation} from "../services/mailer";
import ErrorTypes from "../errors/errorTypes";
import ErrorType from "../errors/errorTypes";

dotenv.config();
const router = Router();


const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit to 5 attempts per window
    message: "Too many login attempts. Try again later.",
});

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const {email} = req.body;
    try {
        const user = await register(req);
        await sendEmailValidation(email, user.id)
        res.json({id: user.id, isEmailVerified: user.is_email_validated});
    } catch (error: any) {
        console.error(error);
        res.json(error);
    }
});

router.post('/login', loginLimiter,  async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;
        const token = await login(email, password);
        res.json({token: token});
    } catch (error: any) {
        console.error(error);
        res.json(error);
    }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const id = +req.params.id || null;
    if (res.locals.user.data.id !== id) {
        res.json({message: ErrorTypes.UNAUTHORIZED.message, statusCode: ErrorType.UNAUTHORIZED.errorCode});
        return;
    }
    if (!id) {
        res.json({message: ErrorTypes.BAD_REQUEST.message, statusCode: ErrorType.BAD_REQUEST.errorCode});
        return;
    }
    const result = await getById(id);
    res.json(result);
})

export default router;
