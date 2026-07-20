import { Router } from "express";
import { signUp , signIn , signOut } from "../controllers/auth.controller.js";
import authorize from '../middlewares/auth.middleware.js';


const authRouter = Router();

authRouter.post('/sign_up', signUp );
authRouter.post('/sign_in', signIn );
authRouter.post('/sign_out', authorize , signOut );

export default authRouter;