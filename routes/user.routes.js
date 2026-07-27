import { Router } from 'express';

import  authorize  from '../middlewares/auth.middleware.js'

import { getUser , updateUser , changePassword , deleteUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.use(authorize);

userRouter.get('/:id', getUser );
userRouter.put('/:id/change-name', updateUser );
userRouter.put('/:id/change-password', changePassword );
userRouter.delete('/:id', deleteUser );

export default userRouter;