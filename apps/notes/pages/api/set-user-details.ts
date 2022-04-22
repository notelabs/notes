import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).send("Method not allowed")
    if (!req.body.email || !req.body.name || !req.body.image) return res.status(400).send("Bad request")

    const data = await prisma.user.update({
        where: {
            email: req.body.email
        },
        data: {
            name: req.body.name,
            image: req.body.image
        }
    })

    res.status(201).send(data)
}
