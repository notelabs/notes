import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })
    console.log(session)

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(201).send(session)
}
