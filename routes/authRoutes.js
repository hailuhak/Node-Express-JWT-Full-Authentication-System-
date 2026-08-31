import express from "express";
import { signup_get, login_get, signup_post, login_post } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET
router.get("/signup", signup_get);
router.get("/login", login_get);

// POST
router.post("/signup", signup_post);
router.post("/login", login_post);
router.get("/smoothies", requireAuth, (req, res) => {
    res.render("smoothies");
});

export default router;