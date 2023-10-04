import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface VaccineData {
    name: string,
    batche: string
}

async function createVaccine(data: VaccineData) {
    const vaccine = await prisma.vaccine.create({
        data
    })

    return vaccine
}

async function getVaccines() {
    const vaccines = await prisma.vaccine.findMany({
        include: {
            Schedule: true
        }
    })

    return vaccines
}

async function getVaccine(id: string) {
    const vaccine = await prisma.vaccine.findUnique({
        where: {
            id: id
        },
        include: {
            Schedule: true
        }
    })

    return vaccine
}

export { createVaccine, getVaccines, getVaccine }