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

        console.log(user);

        res.send("Signup successful");
    } catch (error) {
        console.log(error);
        res.status(400).send("Signup failed");
    }
};

export const login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        console.log(user);

        res.send("Login received");
    } catch (error) {
        console.log(error);
        res.status(400).send("Login failed");
    }
};