import { NextFunction, Request, RequestHandler, Response } from "express";
import { Token } from "../utils/token";
import config from "../config";
import { TTokenPayload } from "../types/token.type";
import prisma from "../db";

/**
 * Middleware function to guard API routes based on user roles.
 *
 * @returns {RequestHandler} - Express middleware function.
 */
export const authGuard = (): RequestHandler =>
  /**
   * Express middleware function to authenticate and authorize users.
   *
   * @param req - Express request object
   * @param res - Express response object
   * @param next - Express next function
   */
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Get the authorization token from the request cookies
      const token = req.cookies.serverAccess;

      if (!token) throw new Error('Unauthorized Access.');

      // Verify the token and decode the payload
      const userTokenDecode = Token.verify(token, config.TOKEN.ACCESS_TOKEN_SECRET) as TTokenPayload;

      // Find the user in the database using the decoded token's email
      const isUserExisted = await prisma.users.findUniqueOrThrow({
        where: {
          email: userTokenDecode.email,
        }
      });

      // Attach the user information to the request object
      req.user = isUserExisted;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Log the error and pass it to the next middleware or error handler
      console.error(error);
      next(error);
    }
  };
