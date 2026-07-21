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

export const updateSubscription = async (req, res, next) => {
try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
        const error = new Error('Subscription not found');
        error.statusCode = 404;
        throw error;
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
    const error = new Error('You are not authorized to update this subscription');
    error.statusCode = 403;
    throw error;
    }

    const restrictedFields = ['startDate', 'renewalDate', 'status', 'user'];
    const bodyKeys = Object.keys(req.body);

    const attemptedRestrictedFields = bodyKeys.filter((key) =>
    restrictedFields.includes(key)
    );
    const allowedKeys = bodyKeys.filter(
    (key) => !restrictedFields.includes(key)
    );

    if (attemptedRestrictedFields.length > 0 && allowedKeys.length === 0) {
    const error = new Error(
        `Updating restricted fields (${attemptedRestrictedFields.join(
        ', '
        )}) is not allowed via this route.`
    );
    error.statusCode = 400;
    throw error;
    }

    const updates = {};
    allowedKeys.forEach((key) => {
    updates[key] = req.body[key];
    });

    Object.assign(subscription, updates);
    const updatedSubscription = await subscription.save();

    let responseMessage = 'Subscription updated successfully';
    if (attemptedRestrictedFields.length > 0) {
        responseMessage += `. Note: Restricted fields (${attemptedRestrictedFields.join(
        ', '
        )}) were ignored and not updated.`;
    }

    res.status(200).json({
        success: true,
        message: responseMessage,
        data: updatedSubscription,
    });
    } catch (error) {
    next(error);
    }
};

export const cancelSubscription = async (req, res, next) => {
try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
        const error = new Error('Subscription not found');
        error.statusCode = 404;
        throw error;
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
        const error = new Error('You are not authorized to cancel this subscription');
        error.statusCode = 403;
        throw error;
    }

    if (subscription.status !== 'active') {
        const error = new Error(`Cannot cancel a subscription with status: ${subscription.status}.`);
        error.statusCode = 400;
        throw error;
    }

    subscription.status = 'cancelled';
    await subscription.save();

    res.status(200).json({
        success: true,
        message: 'Subscription cancelled successfully',
        data: subscription,
    });
    } catch (error) {
    next(error);
    }
};

export const deleteSubscription = async (req, res, next) => {
try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
        const error = new Error('Subscription not found');
        error.statusCode = 404;
        throw error;
    }

    if (subscription.user.toString() !== req.user._id.toString()) {
        const error = new Error('You are not authorized to delete this subscription');
        error.statusCode = 403;
        throw error;
    }

    await Subscription.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: 'Subscription deleted successfully',
    });
    } catch (error) {
    next(error);
    }
};