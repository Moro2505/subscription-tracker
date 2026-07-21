import dayjs from 'dayjs';
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
    const { status, search } = req.query;

    const queryFilter = { user: req.user._id };

    if (status) {
        queryFilter.status = status;
    }

    if (search) {
        queryFilter.name = { $regex: search, $options: 'i' };
    }

    const subscriptions = await Subscription.find(queryFilter).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: subscriptions.length,
        data: subscriptions,
    });
    } catch (error) {
    next(error);
    }
};


export const getUpcomingRenewals = async (req, res, next) => {
try {
    const startDate = dayjs().toDate();
    const endDate = dayjs().add(7, 'day').toDate();

    const upcomingSubscriptions = await Subscription.find({
        user: req.user._id,
        status: 'active',
        renewalDate: {
        $gte: startDate,
        $lte: endDate,
        },
    }).sort({ renewalDate: 1 });

    res.status(200).json({
        success: true,
        count: upcomingSubscriptions.length,
        data: upcomingSubscriptions,
    });
    } catch (error) {
    next(error);
    }
};