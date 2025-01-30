import {Router, Request, Response} from 'express';
import dotenv from 'dotenv';
import {validateEmail} from "../services/user";
import {deactivate} from "../services/url";

dotenv.config();
const router = Router();

router.get('/*', async (req: Request, res: Response): Promise<void> => {
    try {
        const shortCode: string = req.path.replace(/\//g, ""); // Remove all slashes
        await deactivate(shortCode);
        await validateEmail(shortCode);
        res.json();
    } catch (error: any) {
        console.error(error);
        res.json(error);
    }

});

export default router;