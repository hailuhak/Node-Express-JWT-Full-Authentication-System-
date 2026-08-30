
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import router from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware
app.use(express.static("public"));

// View engine
app.set("view engine", "ejs");

//Database connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connected successfully");

    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });


// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/smoothies", (req, res) => {
  res.render("smoothies");
});

app.use(router);


