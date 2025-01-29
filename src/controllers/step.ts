import {Router, Request, Response} from 'express';
import dotenv from 'dotenv';
import {create} from "../services/step";

dotenv.config();
const router = Router();

router.post('/create', async (req: Request, res: Response): Promise<void> => {
    const {title} = req.body;
    const userId = req.body.tokenData.id;

    try {
        const step = await create(title, userId);
        res.json(step);
    } catch (error: any) {
        console.error(error);
        res.json(error);
    }
});

export default router;
