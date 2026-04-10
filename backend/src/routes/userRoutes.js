import { Router } from "express";
import { adminUsers, dashboard } from "../controllers/userController.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const userRoutes = Router();

userRoutes.get("/dashboard", authenticate, dashboard);
userRoutes.get("/admin/users", authenticate, authorizeRoles("admin"), adminUsers);

export { userRoutes };
