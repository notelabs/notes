import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body.email) return res.status(400).send("Missing email")

    const invite = await prisma.invite.create({
        data: {
            email: req.body.email
        }
    })

    res.send(invite)
}
