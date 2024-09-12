import { Request, Response } from "express";
import handelAsyncReq from "../../utils/handelAsyncReq";
import { UserService } from "./users.services";
import successResponse from "../../utils/successResponse";
import { HTTPStatusCode } from "../../utils/httpCode";

const userLogin = handelAsyncReq(async (req: Request, res: Response) => {
  const { accessToken, message, user } = await UserService.login(req.body);

  res.cookie('serverAccess', accessToken, {
    httpOnly: true
  });

  successResponse(res, {
    message: message,
    data: user
  }, HTTPStatusCode.Ok);
});

const userLogout = handelAsyncReq(async (req: Request, res: Response) => {
  res.clearCookie('serverAccess');

  successResponse(res, {
    message: 'Logout successfully.',
    data: null
  }, HTTPStatusCode.Ok);
});

export const UserController = {
  userLogin,
  userLogout
};
