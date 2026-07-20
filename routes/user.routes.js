import { Router } from 'express';

import  authorize  from '../middlewares/auth.middleware.js'

import { getUser , updateUser , changePassword , deleteUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/:id', authorize , getUser );
userRouter.put('/:id/change-name', authorize , updateUser );
userRouter.put('/:id/change-password', authorize , changePassword );
userRouter.delete('/:id', authorize , deleteUser );

export default userRouter;