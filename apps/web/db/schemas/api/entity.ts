import { Prisma } from "@prisma/client";
import prisma from "../../instance";

async function createEntity(data: Prisma.EntityCreateInput) {
  const entity = await prisma.entity.create({
    data,
  });

  return entity;
}

async function getEntities(
  query: Prisma.EntityWhereInput = {},
  include: Prisma.EntityInclude = {},
) {
  const entities = await prisma.entity.findMany({
    where: query,
    include,
  });

  return entities;
}

async function getEntity(
  query: Prisma.EntityWhereUniqueInput,
  include: Prisma.EntityInclude = {},
) {
  const entity = await prisma.entity.findUnique({
    where: query,
    include,
  });

  return entity;
}

export { createEntity, getEntities, getEntity };
