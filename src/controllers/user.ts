import {Router, Request, Response} from 'express';
import dotenv from 'dotenv';
import {login, register, getById} from "../services/user";
import {sendEmailOtp} from "../services/mailer";
import ErrorTypes from "../errors/errorTypes";
import ErrorType from "../errors/errorTypes";

dotenv.config();
const router = Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const {email} = req.body;
    try {
        const user = await register(req);
        await sendEmailOtp(email, user.id)
        res.json({id: user.id, isEmailVerified: user.is_email_validated});
    } catch (error: any) {
        console.error(error);
        res.json(error);
    }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;
        const token = await login(email, password);
        res.json({token: token});
    } catch (error) {
        console.error(error);
        res.json(error);
    }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const id = +req.params.id || null;
    if (req.body.userToken.id !== id) {
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
