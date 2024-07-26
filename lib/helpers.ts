// lib/helpers.ts
import prisma from "@/lib/prisma";

export const findPlayerFromCustomer = async (ibvID: unknown) => {
    if (typeof ibvID !== "string") {
        return null;
    }

    return prisma.player.findFirst({
        where: {
            id: ibvID,
        },
    });
};
