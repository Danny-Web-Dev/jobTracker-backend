import {Router, Request, Response} from 'express';
import dotenv from 'dotenv';
import {create} from "../services/applicationCard";

dotenv.config();
const router = Router();

router.post('/create', async (req: Request, res: Response): Promise<void> => {
    try {
        const {description} = req.body;
        const userId = res.locals.user.data.id;
        const step = await create(description, userId);
        res.json(step);
    } catch (error: any) {
        console.error(error);
        res.json(error);
    }
});

// router.put('/update', async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id, ...updateData } = req.body;
//         const userId = res.locals.user.data.id;
//         await update(id, userId, updateData);
//         res.json();
//     } catch (error: any) {
//         console.error('error2', error);
//         res.json(error);
//     }
// })
//
// router.get('/all', async (req: Request, res: Response): Promise<void> => {
//
// })
export default router;
