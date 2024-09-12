import { Details, Users } from "@prisma/client";
import prisma from "../../db";
import { Token } from "../../utils/token";
import config from "../../config";
import { TTokenPayload } from "../../types/token.type";

async function login(payload: Users) {
  const isUserExist = await prisma.users.findUnique({
    where: {
      email: payload.email
    }
  });

  if (isUserExist) {
    const tokenPayload: TTokenPayload = {
      email: isUserExist?.email,
      name: isUserExist.name,
      image: isUserExist.image
    };
    const accessToken = Token.sign(tokenPayload, config.TOKEN.ACCESS_TOKEN_SECRET, config.TOKEN.ACCESS_TOKEN_EXPIRES_TIME);
    return {
      message: 'Login Successful.',
      accessToken,
      user: tokenPayload
    };
  }
  else {
    const result = await prisma.users.create({
      data: payload
    });
    const tokenPayload: TTokenPayload = {
      email: result.email,
      name: result.name,
      image: result.image
    };
    const accessToken = Token.sign(tokenPayload, config.TOKEN.ACCESS_TOKEN_SECRET, config.TOKEN.ACCESS_TOKEN_EXPIRES_TIME);
    return {
      message: 'Registration & Login Successful.',
      accessToken,
      user: tokenPayload
    };
  }
};

async function addDetails(id: string, payload: Details) {
  const { userId, ...rest } = payload;
  const isUserExist = await prisma.users.findUniqueOrThrow({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      isBlock: true
    }
  });

  const userDetails = {
    ...rest,
    userId: isUserExist.id
  };

  const result = await prisma.details.create({
    data: userDetails
  });

  return {
    ...isUserExist,
    details: {
      ...result
    }
  };
};

export const UserService = {
  login,
  addDetails
};
