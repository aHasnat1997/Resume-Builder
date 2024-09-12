import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./users.controllers";

export const UserRoutes = Router();

UserRoutes.post(
  '/login',
  validateRequest(UserValidation.loginSchema),
  UserController.userLogin
);

UserRoutes.post(
  '/logout',
  UserController.userLogout
);
