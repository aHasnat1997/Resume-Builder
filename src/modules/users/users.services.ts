import { Details, Projects, Users } from "@prisma/client";
import prisma from "../../db";
import { Token } from "../../utils/token";
import config from "../../config";
import { TTokenPayload } from "../../types/token.type";
import { TUserUpdate } from "../../types/user.type";

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
      id: isUserExist.id
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
      id: result.id
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

async function update(id: string, payload: Partial<TUserUpdate>) {
  const { user, details } = payload;

  const result = await prisma.$transaction(async (tx) => {
    let userUpdateData;
    if (user) {
      userUpdateData = await tx.users.update({
        where: { id: id },
        data: user
      })
    };

    let updatedDetails;
    if (details) {
      updatedDetails = await tx.details.update({
        where: { userId: id },
        data: details
      })
    };

    return { userUpdateData, updatedDetails };
  });

  return {
    ...result.userUpdateData,
    details: {
      ...result.updatedDetails
    }
  };
};

async function addProjects(id: string, payload: Projects) {
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

  const projectData = {
    ...rest,
    userId: isUserExist.id
  };

  const result = await prisma.projects.create({
    data: projectData
  })

  return {
    ...isUserExist,
    project: {
      ...result
    }
  }
};

export const UserService = {
  login,
  addDetails,
  update,
  addProjects
};
