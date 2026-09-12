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
        age: 21,
        isMarried: true,
        nationality: "Indian",
      },
      {
        name: "Arohi",
        email: "arohi@gmail.com",
        age: 22,
        isMarried: false,
        nationality: "Indian",
      },
      {
        name: "Aman",
        email: "aman@gmail.com",
        age: 25,
        isMarried: false,
        nationality: "Indian",
      },
      {
        name: "Priya",
        email: "priya@gmail.com",
        age: 28,
        isMarried: true,
        nationality: "Indian",
      },
      {
        name: "Rohan",
        email: "rohan@gmail.com",
        age: 30,
        isMarried: true,
        nationality: "Indian",
      },
      {
        name: "Sneha",
        email: "sneha@gmail.com",
        age: 24,
        isMarried: false,
        nationality: "Indian",
      },
      {
        name: "Vikash",
        email: "vikash@gmail.com",
        age: 27,
        isMarried: false,
        nationality: "Indian",
      },
      {
        name: "Neha",
        email: "neha@gmail.com",
        age: 31,
        isMarried: true,
        nationality: "Indian",
      },
      {
        name: "Arjun",
        email: "arjun@gmail.com",
        age: 26,
        isMarried: false,
        nationality: "Indian",
      },
      {
        name: "Ananya",
        email: "ananya@gmail.com",
        age: 23,
        isMarried: false,
        nationality: "Indian",
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
