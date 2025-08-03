import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers/index.js";
import { typeDefs } from "./schema.js";
import { Prisma, PrismaClient } from "./generated/prisma/index.js";
import type { DefaultArgs } from "@prisma/client/runtime/binary";
import { jwtHelper } from "./utils/jwtHelper.js";

const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: {
    userId: number | null
  } | null
}

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4444 },
    context: async ({ req }): Promise<Context> => {
      const userInfo = await jwtHelper.getUserInfoFromToken(req.headers.authorization as string);
      return { 
        prisma,
        userInfo
       };
    },
  });

  console.log(`🚀 Server ready at ${url}`);
};

main().catch((error) => {
  console.error("Error starting the server:", error);
  process.exit(1);
});
