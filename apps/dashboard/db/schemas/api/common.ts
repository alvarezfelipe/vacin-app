import { Prisma } from "@prisma/client";
import prisma from "../../instance";

async function createCommon(data: Prisma.CommonCreateInput) {
  const common = await prisma.common.create({
    data,
  });

  return common;
}

async function getCommons(
  query: Prisma.CommonWhereInput = {},
  include: Prisma.CommonInclude = {},
) {
  const commons = await prisma.common.findMany({
    where: query,
    include,
  });

  return commons;
}

async function getCommon(
  query: Prisma.CommonWhereUniqueInput,
  include: Prisma.CommonInclude = {},
) {
  const common = await prisma.common.findUnique({
    where: query,
    include,
  });

  return common;
}

export { createCommon, getCommon, getCommons };
