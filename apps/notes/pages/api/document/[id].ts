import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    if (!session) return res.status(401).send("Unauthenticated")
    if (!req.body.id) return res.status(400).send("Missing id")

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    })

    if (!user) return res.status(401).send("Unauthenticated")

    const docs = await prisma.document.findMany({
        where: {
            id: req.body.id,
            owner: user.id
        }
    })

    if (!docs) return res.status(404).send("Not found")

    res.send(docs)
}
