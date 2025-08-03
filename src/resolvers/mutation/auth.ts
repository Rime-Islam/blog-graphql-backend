import { jwtHelper } from "../../utils/jwtHelper.js";
import bcrypt from "bcrypt";


export type UserInfo = {
  id: number;
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const authResolvers = {
      signup: async (parent: any, args: UserInfo, {prisma}: any) => {
          const isExist = await prisma.user.findUnique({
            where: { email: args.email },
          });
          if (isExist) {
            return {
              userError: "User already exists",
              token: null,
            };
          }
          const hashedPassword = await bcrypt.hash(args.password, 10);
          const newuser = await prisma.user.create({
            data: {
              name: args.name,
              email: args.email,
              password: hashedPassword,
            },
          });
          if (args.bio) {
            await prisma.profile.create({
              data: {
                bio: args.bio,
                userId: newuser.id,
              },
            });
          }
    
          const token = await jwtHelper.generateToken(newuser.id);
          return {
            userError: null,
            token,
          };
        },
        login: async (
          parent: any,
          args: { email: string; password: string },
          {prisma}: any
        ) => {
          const user = await prisma.user.findUnique({
            where: { email: args.email },
          });
          if (!user) {
            throw new Error("User not found");
          }
          const isValid = await bcrypt.compare(args.password, user.password);
          if (!isValid) {
            return {
              userError: "Invalid password",
              token: null,
            };
          }
    
          const token = await jwtHelper.generateToken(user.id);
    
          return {
            userError: null,
            token,
          };
        },
}