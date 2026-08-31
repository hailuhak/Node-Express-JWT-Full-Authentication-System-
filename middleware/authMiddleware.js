import jwt from "jsonwebtoken";

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