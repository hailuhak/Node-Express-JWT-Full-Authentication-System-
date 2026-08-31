import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";

import router from "./routes/authRoutes.js";
import { checkUser } from "./middleware/authMiddleware.js";

const app = express();

// ==================== MIDDLEWARE ====================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));

// Check logged-in user on every request
app.use(checkUser);

// ==================== VIEW ENGINE ====================

app.set("view engine", "ejs");

// ==================== ROUTES ====================

app.get("/", (req, res) => {
    res.render("home");
});

app.use(router);

// ==================== DATABASE ====================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        });
    })
    .catch((err) => {
        console.error(
            "MongoDB connection failed:",
            err.message
        );
    });