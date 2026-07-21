import { Router } from 'express';

import authorize from '../middlewares/auth.middleware.js';

import { createSubscription , 
    getSubscriptions , 
    getUpcomingRenewals , 
    updateSubscription , 
    cancelSubscription , 
    deleteSubscription , 
    renewSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.post('/', authorize , createSubscription );
subscriptionRouter.get('/', authorize , getSubscriptions);
subscriptionRouter.get('/upcoming-renewals', authorize , getUpcomingRenewals);
subscriptionRouter.put('/:id', authorize , updateSubscription);
subscriptionRouter.put('/:id/cancel', authorize , cancelSubscription);
subscriptionRouter.put('/:id/renew', authorize, renewSubscription);
subscriptionRouter.delete('/:id', authorize , deleteSubscription);

export default subscriptionRouter;