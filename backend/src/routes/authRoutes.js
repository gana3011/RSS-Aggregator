import express from "express";
import { body } from "express-validator";
import { RequestValidation } from "../middlewares/request-validation.js";
import { signup, signin, verifyEmail, verifyUser, signout, forgotPass, resetPass } from "../controllers/authController.js";
// import { RequireAuth } from "../middlewares/require-auth.js";
import { CheckAuth } from "../middlewares/check-auth.js";


const router = express.Router();

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Username must be present"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 to 20 character"),
  ],
  RequestValidation,
  signup
);

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password must be present"),
  ],
  RequestValidation,
  signin
);

router.get("/verifyemail/:token",verifyEmail);

router.get("/verify",CheckAuth,verifyUser);

router.post("/signout",signout);

router.post("/forgot-password",forgotPass);

router.post("/reset-password/:token",resetPass);


export default router;
