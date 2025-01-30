import { Password } from "../utils/password.js";
import jwt from "jsonwebtoken";
import { pool } from "../utils/database.js";


export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await pool.query("select * from users where email=$1",[email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).send({ message: "Email already in use" });
    }

    const hashedPassword = await Password.toHash(password);

    const user = await pool.query("insert into users(name,email,password) values($1,$2,$3)",[name,email,hashedPassword]);
    if(user.rowCount > 0){
      const userDetails = await pool.query("select * from users where email = $1",[email]);
    return res.status(200).send({ message: "User created successfully", id: userDetails.rows[0].id, name: userDetails.rows[0].name});
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({message : "Server error! Try again"});
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result =await pool.query("select id,email,password from users where email=$1",[email]);
    if (result.rows.length == 0) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const existingUser = result.rows[0];

    const passwordMatch = await Password.comparePasswords(existingUser.password, password);
    if (!passwordMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const userJWT = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY
    );

    res.json({ token:userJWT, message: "User logged in successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({message : "Server error! Try again"});
  }
};
