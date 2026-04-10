import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function signJwt(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
      name: user.name,
      email: user.email,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

export function verifyJwt(token) {
  return jwt.verify(token, env.jwtSecret);
}
