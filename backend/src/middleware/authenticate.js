import { verifyJwt } from "../utils/jwt.js";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  try {
    const payload = verifyJwt(token);
    req.auth = {
      userId: payload.sub,
      role: payload.role,
      email: payload.email,
      name: payload.name,
    };
    return next();
  } catch (_error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
