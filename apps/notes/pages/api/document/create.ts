import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    if (!session) return res.status(401).send("Unauthenticated")
    if (!req.body.title || !req.body.content) return res.status(400).send("Missing id or content")

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    })

    if (!user) return res.status(401).send("Unauthenticated")

    const doc = await prisma.document.create({
        data: {
            user: {
                connect: {
                    id: user.id
                }
            },
            title: req.body.title,
            content: req.body.content
        }
    })

    res.send(doc)
}
