import { User } from "../models/User.js";

export async function dashboard(req, res) {
  return res.status(200).json({
    message: `Welcome ${req.auth.name}. Your private dashboard is verified by JWT.`,
    role: req.auth.role,
    email: req.auth.email,
  });
}

export async function adminUsers(_req, res, next) {
  try {
    const users = await User.find().select("name email role createdAt").sort({ createdAt: -1 });
    return res.status(200).json({ users });
  } catch (error) {
    return next(error);
  }
}
