import type { NextApiRequest, NextApiResponse } from 'next'
import avatar from "gradient-avatar"

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { slug } = req.query

    res.setHeader("Cache-Control", "max-age=31536000, immutable")
    res.setHeader("Content-Type", "image/svg+xml")
    res.send(avatar(slug ? typeof slug === "string" ? slug : "hi" : "hi", 48))
}
