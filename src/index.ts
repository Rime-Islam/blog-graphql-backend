import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers/index.js';
import { typeDefs } from './schema.js';

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4444 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

main().catch((error) => {
  console.error('Error starting the server:', error);
  process.exit(1);
});