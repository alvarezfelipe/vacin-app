import { Prisma } from "@prisma/client";
import prisma from "../../instance";

async function createSchedule(data: Prisma.ScheduleCreateInput) {
  const schedule = await prisma.schedule.create({
    data,
  });

  return schedule;
}

async function getSchedules(
  query: Prisma.ScheduleWhereInput = {},
  include: Prisma.ScheduleInclude = {},
) {
  const schedules = await prisma.schedule.findMany({
    where: query,
    include,
  });

  return schedules;
}

async function getSchedule(
  query: Prisma.ScheduleWhereUniqueInput,
  include: Prisma.ScheduleInclude = {},
) {
  const schedule = await prisma.schedule.findUnique({
    where: query,
    include,
  });

  return schedule;
}

export { createSchedule, getSchedules, getSchedule };
