import prisma from '../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const launched = await prisma.launch.findFirst({
        where: {
            launched: true
        }
    })

    if (process.env.NODE_ENV === "development") return res.send(true)

    if (!launched) return res.json({})

    res.json(launched)
}
