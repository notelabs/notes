import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    if (!session) return res.status(401).send("Unauthenticated")

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    })

    const docs = await prisma.document.findMany({
        where: {
            owner: user?.id
        },
        orderBy: {
            updatedAt: "desc"
        }
    })

    res.send(docs)
}
