import { User } from "../Models/user.js";

export const signup_get = (req, res) => {
    res.render("signup");
};

export const login_get = (req, res) => {
    res.render("login");
};

export const signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({
            email,
            password
        });

        res.status(201).json({
            message: "Signup successful",
            user
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

        // Other errors
        console.log(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

export const login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email or password is incorrect"
            });
        }

        res.json({
            message: "Login successful",
            user
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Login failed"
        });
    }
};