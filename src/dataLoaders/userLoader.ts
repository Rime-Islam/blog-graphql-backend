import DataLoader from "dataloader";
import { prisma } from "../index.js"
import type { user } from "../generated/prisma/client.js";


const batchUsers = async(ids: number[]): Promise<user[]> => {
    // ids: [3, 4, 5, 6, 7, 8, 9]
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: ids
            }
        }
    });

    const userData: {[key: string]: user} = {};
    users.forEach((user) => {
        userData[user.id] = user;
    });

    return ids.map((id) => userData[id]);
};

// @ts-ignore
export const userLoader = new DataLoader<number, user>(batchUsers)