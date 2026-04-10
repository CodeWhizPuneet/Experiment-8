import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5001,
  mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/experiment_8_auth",
  mongodbDnsServers: process.env.MONGODB_DNS_SERVERS || "8.8.8.8,1.1.1.1",
  jwtSecret: process.env.JWT_SECRET || "dev_secret_change_me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  seedAdminEmail: process.env.SEED_ADMIN_EMAIL || "admin@college.edu",
  seedAdminPassword: process.env.SEED_ADMIN_PASSWORD || "Admin@123",
  seedStudentEmail: process.env.SEED_STUDENT_EMAIL || "student@college.edu",
  seedStudentPassword: process.env.SEED_STUDENT_PASSWORD || "Student@123",
};
