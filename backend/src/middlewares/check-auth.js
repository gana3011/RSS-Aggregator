import jwt from "jsonwebtoken";

export const CheckAuth = (req,res,next)=>{
    // console.log(req.cookies);
    const token = req.cookies.authToken;
    // console.log("Extracted Token:", token);
    if(!token){
        return res.status(401).send({message:"Unauthorized"});
    }
     try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        // console.log("Decoded Token:", decodedToken);
        req.user = decodedToken;
        next();
      } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
}