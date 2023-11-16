import { Prisma } from "@prisma/client";
import prisma from "../../instance";

async function createUser(data: Prisma.UserCreateInput) {
  const user = await prisma.user.create({
    data,
  });

  return user;
}

async function getUsers(
  query: Prisma.UserWhereInput = {},
  include: Prisma.UserInclude = {},
) {
  const users = await prisma.user.findMany({
    where: query,
    include,
  });

  return users;
}

async function getUser(
  query: Prisma.UserWhereUniqueInput,
  include: Prisma.UserInclude = {},
) {
  const user = await prisma.user.findUnique({
    where: query,
    include,
  });

  return user;
}

export { createUser, getUsers, getUser };
