import { Password } from "../utils/password.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import { pool } from "../utils/database.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587,               
  secure: false,           
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});


export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await pool.query("select * from users where email=$1",[email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).send({ message: "Email already in use" });
    }

    const hashedPassword = await Password.toHash(password);

    await pool.query("insert into users(name,email,password) values($1,$2,$3)",[name,email,hashedPassword]);

    const token = jwt.sign({email}, process.env.JWT_KEY, {expiresIn: "1h"});
    
    const verificationLink = `http://localhost:5173/verifyEmail/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      text: `Click the link below to verify your email:\n${verificationLink}`
    });

    return res.status(200).send({ message: "Verification mail sent, check your inbox"});
    
  } catch (err) {
    console.error(err);
    res.status(500).send({message : "Server error! Try again"});
  }
};

export const verifyEmail = async(req, res) =>{
  try{
    const {token} = req.params;
    
    if (!token) return res.status(400).json({ message: "No token found" });

    const decoded  = jwt.verify(token, process.env.JWT_KEY);

    const user = await pool.query("select * from users where email=$1",[decoded.email]);

    if(user.rows.length == 0) return res.status(404).send({message: "User not found"});

    await pool.query("update users set verified = true where email = $1",[decoded.email]);

    res.status(200).send({message: "Email verified successfully"});
    }
    catch(err){
      res.send({message:"No token"});
      console.log(err.message);
    }
}

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result =await pool.query("select * from users where email=$1",[email]);
    if (result.rows.length == 0) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const existingUser = result.rows[0];

    if(!existingUser.verified) return res.status(400).send({message:"Verify your email"});

    const passwordMatch = await Password.comparePasswords(existingUser.password, password);
    if (!passwordMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      },
      process.env.JWT_KEY,
      {expiresIn: "7d"}
    );

    res.cookie("authToken", userJWT, {
      httpOnly: true,
      secure: true, 
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",       
  });
    res.json({ token:userJWT, id:existingUser.id, message: "User logged in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({message : "Server error! Try again"});
  }
};

export const verifyUser = async(req,res)=>{
  if(!req.user) return res.status(401).json({ message: "Unauthorized" });
  // console.log(req.user);
  res.status(200).send({user:req.user});
}

export const signout = async(req,res) =>{
  try{
  res.clearCookie("authToken",{path:"/"});
  console.log("Logged out");
  res.status(200).send({message:"User logged out"});
  }
  catch(error){
    res.status(500).send("Unable to log out");
    console.error(error.message);
  }
}

export const forgotPass = async(req,res) =>{
  const {email} =  req.body;
  try {
    const existingUser = await pool.query("select * from users where email = $1",[email]);
    if(existingUser.rows.length === 0) return res.status(400).send({message:"Email doesn't exist"});
    const token = jwt.sign({email}, process.env.JWT_KEY, {expiresIn: "15m"});
    
    const verificationLink = `http://localhost:5173/resetPassword/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `Click the link below to reset your password:\n${verificationLink}`
    });
    return res.status(200).send({message:"Reset link sent"});
  } catch (error) {
    console.error(error.message);
    res.status(500).send({message:"Server Error"});
  }
}

export const resetPass = async(req,res)=>{
  const {password} = req.body;
  console.log(password);
  const {token} = req.params;
  try{
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await pool.query("select * from users where email = $1",[decoded.email]);
    if(user.rows.length === 0) return res.status(400).send({message:"Invalid token"});
    const hashedPassword = await Password.toHash(password);
    const response = await pool.query("update users set password = $1 where email=$2",[hashedPassword,decoded.email]);
    res.status(200).send({message:"Password reset successfull"});
  }
  catch(error){
    res.status(500).send({message:"Server error"});
    console.error(error.message);
  }
}