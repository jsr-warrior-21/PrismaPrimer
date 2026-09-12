import prisma from "./lib/prisma";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { Request } from "express";
import { Response } from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

// getting user

app.get("/user", async (_req: Request, res: Response) => {
  const response = await prisma.user.findMany();

  if (!response) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    body: response,
  });
});
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
