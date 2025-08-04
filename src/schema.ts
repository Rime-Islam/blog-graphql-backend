export const typeDefs = `#graphql
   type Query {
      posts: [Post]
      users: [User]
      profile(userId: ID!): Profile
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

      addPost(post: PostInput!): postArgs!,
      updatePost(
         postId: Int!,
         post: PostInput
         ): postArgs,
      deletePost(postId: ID!): postArgs,
      publishPost(postId: ID!): postArgs


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
`;
