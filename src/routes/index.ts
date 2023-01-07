import express, {Router} from 'express';
const router: Router = express.Router();

import { authRouter } from './auth.route';

router.use("/auth", authRouter);

export const fullRouter: Router = router;