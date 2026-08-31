import jwt from "jsonwebtoken";
import { User } from "../Models/user.js";

export const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.redirect("/login");
    }
};

export const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    // No JWT → user is not logged in
    if (!token) {
        res.locals.user = null;
        return next();
    }

    try {
        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find user in database
        const user = await User.findById(decoded.userId);

        // Make user available to all EJS views
        res.locals.user = user;

        next();

    } catch (error) {
        res.locals.user = null;
        next();
    }
};

