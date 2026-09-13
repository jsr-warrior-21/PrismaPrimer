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

// getting user - (READ OPERATIONS)

app.get("/user", async (_req: Request, res: Response) => {
  // const response = await prisma.user.findMany({where:{isMarried:true}});

  //--- gte - greater than equal

  // const response = await prisma.user.findMany({where:{isMarried:true,age:{gte:25}}});

  //-- OR conditon (u can add more user like this for or condition)

  // const response = await prisma.user.findMany({where:{
  //   OR:[
  //     {nationality:"Indian"},{age:{gte:25}}
  //   ]
  // }});

  //-- AND condition

  //  const response = await prisma.user.findMany({where:{
  //   AND:[
  //     {nationality:"Indian"},{age:{gte:25}}
  //   ]
  // }});

  //-- negation -- NOT condition

  //  const response = await prisma.user.findMany({where:{
  //   nationality:{not:"Indian"}
  // }});

  //--- IN condition

  const response = await prisma.user.findMany({
    where: {
      nationality: {
        in: ["Indian", "Australian", "British"], //this apply or conditon on each nationality
      },
    },
  });

  if (!response) {
    return res.status(404).json({
      message: "User not found in db",
    });
  }

  return res
    .status(200)
    .json({
      success: true,
      data: response,
    });
});

// Updating the user data

app.put("/user", async (_req: Request, res: Response) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: 7,
    },
    data: {
      age: 40,
      isMarried: true,
    },
  });
  if (!updatedUser) {
    return res.json("User not found");
  }
  return res
    .status(200)
    .json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
});

// Deleting the user data

app.delete("/user", async (_req: Request, res: Response) => {
  const deletedUser = await prisma.user.delete({ where: { id: 14 } });
  return res.status(204).send();
});
app.delete('/user',async(_req:Request,res:Response)=>{
  const deletedUser = await prisma.user.deleteMany({where:{age:{gte:30}}});
  return res.status(204).json({success:true,message:"Users deleted successfully."})
})




app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
