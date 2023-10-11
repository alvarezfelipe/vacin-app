import { Prisma } from '@prisma/client'
import prisma from '../../instance'

async function createVaccine(data: Prisma.VaccineCreateInput) {
    const vaccine = await prisma.vaccine.create({
        data
    })

    return vaccine
}

async function getVaccines(query: Prisma.VaccineWhereInput = {}, include: Prisma.VaccineInclude = {}) {
    const vaccines = await prisma.vaccine.findMany({
        where: query,
        include
    })

    return vaccines
}

async function getVaccine(query: Prisma.VaccineWhereUniqueInput, include: Prisma.VaccineInclude = {}) {
    const vaccine = await prisma.vaccine.findUnique({
        where: query,
        include
    })

    return vaccine
}

export { createVaccine, getVaccines, getVaccine }