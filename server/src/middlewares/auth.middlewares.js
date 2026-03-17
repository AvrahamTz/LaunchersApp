import jwt from "jsonwebtoken";
import {config} from 'dotenv';
config()
export const authMiddleware = (req,res,next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

export const doubleAcsses = (req, res, next) => {
  if (req.user.role !== "admin" || req.user.role !== "airMilatry") {
    return res.status(403).json({ message: "Access denied..." });
  }
  next();
};

export const airMilatryOnly = (req, res, next) => {
  if (req.user.role !== "airMilatry") {
    return res.status(403).json({ message: "Access denied. AirMilatry only." });
  }
  next();
};