import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function seed() {
  const user = await prisma.user.createMany({
    data: [
      {
        name: "Rahul",
        email: "rahul@gmail.com",
        age:21,
        isMarried:true,
        nationality:"Indian"
      },
      {
        name: "Arohi",
        email: "arohi@gmail.com",
         age:12,
        isMarried:false,
        nationality:"Indian"
      },
    ],
  });

  console.log(user);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
