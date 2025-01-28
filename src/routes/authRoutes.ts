import {Router, Request, Response} from 'express';
import dotenv from 'dotenv';
import {login, register} from "../services/user";
import {sendEmailOtp} from "../services/mailer";
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

export default router;
