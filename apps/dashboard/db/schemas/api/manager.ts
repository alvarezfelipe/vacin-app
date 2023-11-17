import { Prisma } from "@prisma/client";
import prisma from "../../instance";

async function createManager(data: Prisma.ManegerCreateInput) {
  const manager = await prisma.maneger.create({
    data,
  });

  return manager;
}

async function getManagers(
  query: Prisma.ManegerWhereInput = {},
  include: Prisma.Manager = {},
) {
  const managers = await prisma.maneger.findMany({
    where: query,
    include,
  });

  return managers;
}

async function getManager(
  query: Prisma.ManegerWhereUniqueInput,
  include: Prisma.ManegerInclude = {},
) {
  const manager = await prisma.maneger.findUnique({
    where: query,
    include,
  });

  return manager;
}

export { createManager, getManagers, getManager };
