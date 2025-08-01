import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";
 import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface UserInfo {   
  name: string; 
  email: string;
  password: string;       
}

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      return await prisma.user.findMany();
    },
    // user: async (parent: any, args: { id: string }, context: any) => {
    //   return await prisma.user.findUnique({
    //     where: { id: args.id }
    //   });
    // }
  },
  Mutation: {
    signup: async(parent: any, args: UserInfo, context: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const newuser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword
        }
      });

      const token = jwt.sign(
        { userId: newuser.id },  "signature", 
        { expiresIn: "12d" });
      return {
        userError: null,
        token,                                  

    }
  },
    login: async(parent: any, args: { email: string; password: string }, context: any) => {   
      const user = await prisma.user.findUnique({
        where: { email: args.email }
      });
      if (!user) {
        throw new Error("User not found");
      }
      const isValid = await bcrypt.compare(args.password, user.password);
      if (!isValid) {     
        return{
          userError: "Invalid password",
          token: null
        };
      }

      const token = jwt.sign(
        { userId: user.id },
        "signature",
        { expiresIn: "12d" }
      );
      return {
        userError: null,
        token
      };
    }
  },
};