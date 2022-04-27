import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })
    if (!session) return res.status(401).send("Unauthenticated")
    console.log(req.body)
    if (!req.body.id || !req.body.content) return res.status(400).send("Missing id or content")

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    })

    if (!user) return res.status(401).send("Unauthenticated")

    const canEdit = await prisma.document.findFirst({
        where: {
            id: req.body.id,
            owner: user?.id
        }
    })

    if (!canEdit) return res.status(401).send("Not your doc")

    const doc = await prisma.document.update({
        where: {
            id: req.body.id,
        },
        data: {
            content: req.body.content
        }
    })

    res.json(doc)
}
