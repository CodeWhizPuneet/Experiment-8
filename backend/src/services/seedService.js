import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { hashPassword } from "../utils/password.js";

async function ensureUser({ name, email, password, role }) {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await User.findOne({ email: normalizedEmail });

  if (existing) {
    return existing;
  }

  return User.create({
    name,
    email: normalizedEmail,
    role,
    passwordHash: await hashPassword(password),
  });
}

export async function seedDefaults() {
  await ensureUser({
    name: "Default Admin",
    email: env.seedAdminEmail,
    password: env.seedAdminPassword,
    role: "admin",
  });

  await ensureUser({
    name: "Default Student",
    email: env.seedStudentEmail,
    password: env.seedStudentPassword,
    role: "student",
  });

  console.log("Default users ready");
}
