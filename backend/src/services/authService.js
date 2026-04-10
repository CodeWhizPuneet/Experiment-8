import { User } from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { signJwt } from "../utils/jwt.js";

function toPublicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function registerUser({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const exists = await User.findOne({ email: normalizedEmail });

  if (exists) {
    throw new Error("Email already registered");
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: await hashPassword(password),
    role: "student",
  });

  return {
    token: signJwt(user),
    user: toPublicUser(user),
  };
}

export async function loginUser({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) {
    throw new Error("Invalid email or password");
  }

  return {
    token: signJwt(user),
    user: toPublicUser(user),
  };
}

export async function findPublicUserById(userId) {
  const user = await User.findById(userId).select("name email role");
  return user;
}
