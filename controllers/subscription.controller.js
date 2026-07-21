import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res, next) => {
try {
    const subscription = await Subscription.create({
    ...req.body,
    user: req.user._id,
});

const { workflowRunId } = await workflowClient.trigger({
url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
body: {
    subscriptionId: subscription.id,
},
headers: {
    'content-type': 'application/json',
},
retries: 0,
});

res.status(201).json({ 
success: true, 
data: subscription, 
workflowRunId: workflowRunId 
});
} catch (error) {
    next(error);
}
}

export const getSubscriptions = async (req, res, next) => {
try {
    const query = { user: req.user._id };

    if (req.query.status) {
        query.status = req.query.status;
    }

    const subscriptions = await Subscription.find(query);

    res.status(200).json({ success: true, count: subscriptions.length , data: subscriptions });
} catch (e) {
    next(e);
}
};