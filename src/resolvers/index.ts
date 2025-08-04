import { Mutation } from "./mutation/mutation.js";
import { Post } from "./post.js";
import { Profile } from "./profile.js";
import { Query } from "./query/query.js";
import { User } from "./user.js";


export const resolvers = {
Query,
Mutation,
User,
Post,
Profile
};
