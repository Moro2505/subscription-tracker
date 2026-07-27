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

subscriptionRouter.use(authorize);

subscriptionRouter.post('/', createSubscription );
subscriptionRouter.get('/', getSubscriptions);
subscriptionRouter.get('/upcoming-renewals', getUpcomingRenewals);
subscriptionRouter.put('/:id', updateSubscription);
subscriptionRouter.put('/:id/cancel', cancelSubscription);
subscriptionRouter.put('/:id/renew', renewSubscription);
subscriptionRouter.delete('/:id', deleteSubscription);

export default subscriptionRouter;