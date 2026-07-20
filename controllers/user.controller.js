import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const getUser = async (req , res , next ) => {
    try {
        if (req.user._id.toString() !== req.params.id) {
            const error = new Error('You are not authorized to view this profile');
            error.statusCode = 403;
            throw error;
        }
        const user = await User.findById(req.params.id).select('-password');

        if(!user){
            const error = new Error('user not found') ;
            error.statuCode = 404 ;
            throw error ;
        } ;
        res.status(200).json({
            success : true ,
            data : user ,
        })

    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
try {
    if (req.user._id.toString() !== req.params.id) {
    const error = new Error('You are not authorized to update this profile');
    error.statusCode = 403;
    throw error;
    }

    const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { returnDocument: 'after', runValidators: true }
    ).select('-password');

    res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: updatedUser,
    });
} catch (error) {
    next(error);
}
};

export const changePassword = async (req, res, next) => {
try {
    const { currentPassword, newPassword } = req.body;

    if (req.user._id.toString() !== req.params.id) {
    const error = new Error('You are not authorized to change this password');
    error.statusCode = 403;
    throw error;
    }

    const user = await User.findById(req.params.id).select('+password');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
    const error = new Error('Current password is incorrect');
    error.statusCode = 401;
    throw error;
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
    const error = new Error('New password cannot be the same as the current password');
    error.statusCode = 400; 
    throw error;
    }   

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
    success: true,
    message: 'Password changed successfully 🔑',
    });
} catch (error) {
    next(error);
}
};

export const deleteUser = async (req, res, next) => {
    try {
    if (req.user._id.toString() !== req.params.id) {
        const error = new Error('You are not authorized to delete this account');
        error.statusCode = 403;
        throw error;
    }

    await User.findByIdAndDelete(req.params.id);

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    res.status(200).json({
        success: true,
        message: 'Account deleted successfully 🗑️',
    });
    } catch (error) {
        next(error);
}
};