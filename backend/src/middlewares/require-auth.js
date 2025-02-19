// import jwt from "jsonwebtoken";

// export const RequireAuth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       console.log("No auth header found");
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//   console.log("Extracted Token:", token);
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   try {
//     const decodedToken = jwt.verify(token, process.env.JWT_KEY);
//     console.log("Decoded Token:", decodedToken);
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid Token" });
//   }
// };
