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

const addDetails = handelAsyncReq(async (req: Request, res: Response) => {
  const id = req.user.id;

  const data = req.body;

  const result = await UserService.addDetails(id, data);

  successResponse(res, {
    message: 'User details add successful',
    data: result
  }, HTTPStatusCode.Ok);
});

const updateDetails = handelAsyncReq(async (req: Request, res: Response) => {
  const id = req.user.id;

  const data = req.body;

  const result = await UserService.update(id, data);

  successResponse(res, {
    message: 'User update successful.',
    data: result
  }, HTTPStatusCode.Ok);
});

const addProjects = handelAsyncReq(async (req: Request, res: Response) => {
  const id = req.user.id;

  const data = req.body;

  const result = await UserService.addProjects(id, data);

  successResponse(res, {
    message: 'User project add successful',
    data: result
  }, HTTPStatusCode.Ok);
});

export const UserController = {
  userLogin,
  userLogout,
  addDetails,
  updateDetails,
  addProjects
};
