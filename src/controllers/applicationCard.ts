import {Router, Request, Response} from 'express';
import dotenv from 'dotenv';
import {create} from "../services/applicationCard";
import {ApplicationCardDescriptionRequest} from "../interfaces/applicationCardDescription";
import {validateApplicationCardDesc} from "../middlewares/applicationCardDescription";
import {update} from "../services/applicationCard";
import {Jwt} from "../utils/jwt";

dotenv.config();
const router = Router();

router.post('/create', validateApplicationCardDesc, async (req: Request, res: Response): Promise<void> => {
    try {
        const description: ApplicationCardDescriptionRequest = req.body.description;
        const userId = Jwt.getInstance().getUserId() ?? 0;
        const step = await create(description, userId);
        res.json(step);
    } catch (error: any) {
        console.error(error);
        res.json(error);
    }
});

router.put('/update', validateApplicationCardDesc,  async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;
        const descriptionData: ApplicationCardDescriptionRequest = req.body.description;
        const userId = Jwt.getInstance().getUserId() ?? 0;
        await update(id, userId, descriptionData);
        res.json();
    } catch (error: any) {
        console.error(error);
        res.json(error);
    }
})

export default router;
