import { ArrowBackIcon, CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Container, Heading, HStack, Text, IconButton, Textarea, ButtonGroup, Button, Editable, EditableInput, EditablePreview, Input, Tooltip, useEditableControls, useToast } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../lib/prisma'
import NextLink from 'next/link'
import { useColor } from 'hooks'
import { HiPencil } from 'react-icons/hi'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useAutosave } from 'react-autosave'
import Head from 'next/head'
import useSWR, { useSWRConfig } from 'swr'

export default function Doc({ data }: any) {
    const secondaryColor = useColor({ color: "secondary" })
    const [input, setInput] = useState(data.content)
    const save = useCallback(() => axios.post('/api/document/update', { id: data.id, content: input }), [])
    useAutosave({ data: input, onSave: save });

    // @ts-ignore
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data: clientData, error } = useSWR(`/api/document/${data.id}`, fetcher)
    const toast = useToast()
    const { mutate } = useSWRConfig()

    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps
        } = useEditableControls();

        return isEditing ? (
            <ButtonGroup size="sm" spacing={2} mt={2}>
                <IconButton icon={<CheckIcon />} aria-label="Submit" {...getSubmitButtonProps()} />
                <IconButton
                    icon={<CloseIcon boxSize={3} />}
                    aria-label="Cancel"
                    {...getCancelButtonProps()}
                />
            </ButtonGroup>
        ) : null;
    }

    function RightClickEdit({ children }: any) {
        const { getEditButtonProps } = useEditableControls()
        const btn = getEditButtonProps()

        return (
            <Box onContextMenu={(e) => {
                e.preventDefault()
                // @ts-ignore
                btn.onClick()
            }}>
                {children}
            </Box>
        )
    }

    return <>
        <Head>
            <title>{data.title} - Notelabs</title>
        </Head>
        <Container maxW="container.md">
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
                <Editable
                    defaultValue={data.title}
                    isPreviewFocusable={false}
                    selectAllOnFocus={false}
                    onSubmit={(nextValue: string) => {
                        axios.post('/api/document/update/title', { id: data.id, title: nextValue }).then(() => {
                            toast({
                                status: "success",
                                title: "Document renamed successfully"
                            })
                        }).catch(() => {
                            toast({
                                status: "error",
                                title: "An error occured renaming your document"
                            })
                        })
                        mutate(`/api/document/${data.id}`);
                    }}
                >
                    <RightClickEdit>
                        <Tooltip shouldWrapChildren label="Right click to rename">
                            <Heading cursor="pointer" py={2} pb={4} mt={1} as={EditablePreview} />
                        </Tooltip>
                    </RightClickEdit>
                    <HStack>
                        <Input pt={2} mb={1.5} size="lg" fontSize="4xl" variant="unstyled" fontWeight="bold" _focus={{ boxShadow: "none" }} fontFamily="Cal Sans, sans-serif" as={EditableInput} />
                        <EditableControls />
                    </HStack>
                </Editable>
                <Textarea minH="70vh" value={input} onChange={(e) => setInput(e.target.value)} variant="flushed" />
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Text fontSize="sm" color={secondaryColor}>Document id is <code>{data.id}</code>.</Text>
                <Text fontSize="sm" color={secondaryColor}>Notelabs is in beta.</Text>
            </Box>
        </Container>
    </>
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
