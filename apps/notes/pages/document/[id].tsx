import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Container, Heading, HStack, Text, IconButton, Textarea, ButtonGroup, Button } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../lib/prisma'
import NextLink from 'next/link'
import { useColor } from 'hooks'
import { HiPencil } from 'react-icons/hi'

export default function Doc({ data }: any) {
    const secondaryColor = useColor({ color: "secondary" })

    return <Container maxW="container.md">
        <Box display="flex" justifyContent="space-between" as="nav" my={6}>
            <HStack>
                <NextLink href="/">
                    <IconButton aria-label='Go home' variant="ghost" icon={<ArrowBackIcon />} />
                </NextLink>
            </HStack>
            <ButtonGroup>
                <IconButton aria-label='Update details' variant="ghost" icon={<HiPencil />} />
                <Button colorScheme="blue">Share</Button>
            </ButtonGroup>
        </Box>
        <Box py={6}>
            <Heading pb={4}>{data.title}</Heading>
            <Textarea minH="70vh" defaultValue={data.content} variant="flushed" />
        </Box>
        <Box display="flex" justifyContent="space-between">
            <Text fontSize="sm" color={secondaryColor}>Document id is <code>{data.id}</code>.</Text>
            <Text fontSize="sm" color={secondaryColor}>Notelabs is in beta.</Text>
        </Box>
    </Container>
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
