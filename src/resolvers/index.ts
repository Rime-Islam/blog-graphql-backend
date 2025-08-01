

export const resolvers = {
  Query: {

  },
  Mutation: {
    signup: (parent: any, args: any, context: any) => {
      console.log('Signup mutation called with args:', args);
    }
  }
};