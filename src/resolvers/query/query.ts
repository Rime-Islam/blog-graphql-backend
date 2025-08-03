
  
 export const Query = {
    users: async (parent: any, args: any, {prisma}: any) => {
      return await prisma.user.findMany();
    },
        profile: async (parent: any, args: any, { prisma, userInfo }: any) => {
        return await prisma.profile.findUnique({
            where: {
                userId: Number(args.userId)
            }
        })
    },
     posts: async (parent: any, args: any, { prisma }: any) => {
        console.log("post");
        return await prisma.post.findMany({
            where: {
                published: true
            },
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ]
        });
    }
    // user: async (parent: any, args: { id: string }, context: any) => {
    //   return await prisma.user.findUnique({
    //     where: { id: args.id }
    //   });
    // }
  };