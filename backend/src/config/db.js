import mongoose from "mongoose";
import dns from "node:dns";
import { env } from "./env.js";

export async function connectDatabase() {
  const isSrvUri = env.mongodbUri.startsWith("mongodb+srv://");

  if (isSrvUri) {
    const servers = env.mongodbDnsServers
      .split(",")
      .map((server) => server.trim())
      .filter(Boolean);

    if (servers.length > 0) {
      dns.setServers(servers);
    }
  }

  try {
    await mongoose.connect(env.mongodbUri);
    console.log("MongoDB connected");
  } catch (error) {
    if (String(error.message || "").includes("querySrv")) {
      console.error("MongoDB SRV lookup failed. Check DNS or use MONGODB_DNS_SERVERS in .env");
    }

    throw error;
  }
}
