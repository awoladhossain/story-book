import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const dicode = jwt.verify(token, process.env.JWT_SECRET);
    if (!dicode) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = dicode.userId;

    next();
  } catch (error) {
    console.log("Token verification error:", error);
    return res.status(403).json({ message: "Forbidden" });
  }
};
