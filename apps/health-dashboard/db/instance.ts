import { PrismaClient } from "database";
import bcrypt from "bcryptjs"

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    model: {
      entity: {
        async signIn(username: string, password: string) {
          const user = await prisma.entity.findFirstOrThrow({
            where: {
              username
            }
          })

          if(await bcrypt.compareSync(password, user.password)) {
            return user
          } else {
            throw new Error("Credenciais inválidas :v.")
          }
        }
      }
    }
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
