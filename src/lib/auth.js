// utils/auth.js
import jwt from 'jsonwebtoken';

export const getUserIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};
