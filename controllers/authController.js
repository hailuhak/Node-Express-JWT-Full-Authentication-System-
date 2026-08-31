
import { User } from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ==================== GET ====================

export const signup_get = (req, res) => {
    res.render("signup");
};

export const login_get = (req, res) => {
    res.render("login");
};

// ==================== SIGNUP ====================

export const signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Create user
        const user = await User.create({
            email,
            password
        });

        // Create JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Store JWT in cookie
      res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000
});

        res.status(201).json({
            message: "Signup successful"
        });

    } catch (error) {

        // Duplicate email
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Validation errors
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Signup failed",
                errors: Object.values(error.errors).map(
                    err => err.message
                )
            });
        }

        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
};


// ==================== LOGIN ====================

export const login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email or password is incorrect"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Email or password is incorrect"
            });
        }

        // Create JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Store JWT in cookie
        res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000
});

        res.status(200).json({
            message: "Login successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
};
export const logout_get = (req, res) => {
    res.clearCookie("jwt");

    res.redirect("/");
};

