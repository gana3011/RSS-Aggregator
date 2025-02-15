import express from "express";
import { body } from "express-validator";
import { RequestValidation } from "../middlewares/request-validation.js";
import { signup, signin, verifyEmail, verifyUser } from "../controllers/authController.js";
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

router.get("/seeCookie",(req,res)=>{
  console.log(req.cookies);
}
)


export default router;
