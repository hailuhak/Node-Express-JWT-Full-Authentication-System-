import jwt from "jsonwebtoken";
import { User } from "../Models/user.js";

// Protect specific routes
export const requireAuth = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.redirect("/login");
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.redirect("/login");
        }

        req.user = user;

        next();

    } catch (error) {
        return res.redirect("/login");
    }
};

// Check user on every request
export const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.locals.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.userId);

        if (!user) {
            res.locals.user = null;
            return next();
        }

        res.locals.user = user;

        next();

    } catch (error) {
        res.locals.user = null;
        next();
    }
};