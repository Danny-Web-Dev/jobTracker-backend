import {Router, Request, Response} from 'express';
import dotenv from 'dotenv';
import {create, update} from "../services/step";

dotenv.config();
const router = Router();

router.post('/create', async (req: Request, res: Response): Promise<void> => {
    try {
        const {title} = req.body;
        const userId = res.locals.user.data.id;
        const step = await create(title, userId);
        res.json(step);
    } catch (error: any) {
        console.error(error);
        res.json(error);
    }
});

router.put('/update', async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, ...updateData } = req.body;
        const userId = res.locals.user.data.id;
        await update(id, userId, updateData);
        res.json();
    } catch (error: any) {
        console.error(error);
        res.json(error);
    }
})

router.get('/all', async (req: Request, res: Response): Promise<void> => {

})
export default router;
