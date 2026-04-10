import { findPublicUserById, loginUser, registerUser } from "../services/authService.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const result = await registerUser({ name, email, password });
    return res.status(201).json(result);
  } catch (error) {
    if (error.message === "Email already registered") {
      return res.status(409).json({ message: error.message });
    }

    return next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await loginUser({ email, password });
    return res.status(200).json(result);
  } catch (error) {
    if (error.message === "Invalid email or password") {
      return res.status(401).json({ message: error.message });
    }

    return next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await findPublicUserById(req.auth.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
}
