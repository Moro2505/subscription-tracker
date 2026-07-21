import { Router } from 'express';

import authorize from '../middlewares/auth.middleware.js';

import { createSubscription , getSubscriptions } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.post('/', authorize , createSubscription );
subscriptionRouter.get('/', authorize , getSubscriptions);
subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewals' }));
subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET subscription details' }));
subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE subscription' }));
subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL subscription' }));
subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscription' }));

export default subscriptionRouter;