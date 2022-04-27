import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../lib/prisma'

export default function Doc({ data }: any) {
    return <p>Post: {data.title}</p>
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query
    const session = await getSession({ req: context.req })
    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    })

    if (!user) return {
        notFound: true
    }

    const data = await prisma.document.findFirst({
        where: {
            // @ts-ignore
            id: id,
            owner: user.id
        },
        select: {
            id: true,
            title: true,
            summary: true,
            content: true,
            owner: true,
            user: true,
            createdAt: false,
            updatedAt: false
        }
    })

    const json = JSON.parse(JSON.stringify(data))

    return { props: { data: json } }
}
