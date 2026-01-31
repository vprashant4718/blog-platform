import jwt from 'jsonwebtoken'

// Verify Token 
export const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;
    // console.log("token", token)
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Role Check
export const checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access Forbidden' });
    }
    next();
};