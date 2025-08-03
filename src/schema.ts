export const typeDefs = `#graphql
   type Query {
      posts: [Post]
      users: [User]
      profiles: [Profile]
   }

   type Mutation {
      signup(
         name: String!, 
         email: String!, 
         password: String!
         bio: String
         ): userArgs,

      login(
         email: String!,
         password: String!
         ): userArgs,

      createPost(post: PostInput!): postArgs!,
      updatePost(
         postId: Int!,
         post: PostInput
         ): postArgs,


   }

   type userArgs {
      userError: String
      token: String
   }
   type postArgs {
      userError: String
      post: Post
   }
   input PostInput {
      title: String
      content: String
   }

type Post {
    id: ID!
    title: String!      
    content: String!
    author: User
    createdAt: String!
    published: Boolean!
 }

 type User {
   id: ID!
   name: String!     
   email: String!
   password: String!
   posts: [Post]
   createdAt: String!
 }

 type Profile {
   id: ID!
   bio: String
   createdAt: String!
   user: User!

 }
`;
