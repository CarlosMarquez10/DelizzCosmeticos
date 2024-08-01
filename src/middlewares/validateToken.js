import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequiered = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Auhorization denied" });

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "token invalid" });

    req.user = user

    next();
  });
};
