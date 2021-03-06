import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Container, Heading, HStack, Text, IconButton, Textarea, ButtonGroup, Button, Input, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, useToast } from '@chakra-ui/react'
import { useColor } from 'hooks'
import { HiPencil } from 'react-icons/hi'
import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import NextLink from "next/link"
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Doc() {
    const secondaryColor = useColor({ color: "secondary" })
    const [input, setInput] = useState('')
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const toast = useToast()
    const router = useRouter()

    useEffect(() => {
        function handler(e: any) {
            var confirmationMessage = 'It looks like you have been editing something. ' + 'If you leave before saving, your changes will be lost.';
            (e || window.event).returnValue = confirmationMessage;
        }

        function popHandler(e: any) {
            onOpen()
        }

        window.addEventListener("beforeunload", handler);
        window.addEventListener("popstate", popHandler);

        history.pushState(null, document.title, location.href);
        window.addEventListener('popstate', function (event) {
            history.pushState(null, document.title, location.href);
        });


        return () => {
            window.removeEventListener("beforeunload", handler);
            window.removeEventListener("popstate", popHandler);
            window.removeEventListener('popstate', function (event) {
                history.pushState(null, document.title, location.href);
            })
        }
    })

    function create () {
        setIsLoading(true)
        axios.post('/api/document/create', { title: title, content: input }).then((data) => {
            toast({
              status: "success",
              title: "Document created successfully"
            })
            router.replace(`/document/${data.data.id}`)
          }).catch(() => {
            toast({
              status: "error",
              title: "An error occured creating your document"
            })
            setIsLoading(false)
          })
    }


    return <>
        <Head>
            <title>{title ? title : "Untitled"} - Notelabs</title>
        </Head>
        <Container maxW="container.md">
            <Box display="flex" justifyContent="space-between" as="nav" my={6}>
                <HStack>
                    <IconButton onClick={onOpen} isDisabled={isLoading} aria-label='Go home' variant="ghost" icon={<ArrowBackIcon />} />
                    <AlertDialog
                        isOpen={isOpen}
                        // @ts-ignore
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <Heading size="md" mt={4}>Discard changes and go home</Heading>
                                </AlertDialogHeader>

                                <AlertDialogBody>
                                    Are you sure? You can&apos;t undo this action afterwards.
                                </AlertDialogBody>

                                <AlertDialogFooter>
                                    {/* @ts-ignore */}
                                    <Button ref={cancelRef} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <NextLink href="/">
                                        <Button colorScheme='red' onClick={onClose} ml={3}>
                                            Discard changes
                                        </Button>
                                    </NextLink>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>

                </HStack>
                <ButtonGroup>
                    <Button colorScheme="blue" isLoading={isLoading} onClick={create}>Create</Button>
                </ButtonGroup>
            </Box>
            <Box py={6}>
                <Input isDisabled={isLoading} value={title} onChange={(e) => setTitle(e.target.value)} pt={2} mb={1.5} size="lg" placeholder='Give me a name' fontSize="4xl" variant="unstyled" fontWeight="bold" _focus={{ boxShadow: "none" }} fontFamily="Cal Sans, sans-serif" />
                <Textarea isDisabled={isLoading} placeholder='Now write something brilliant...' minH="70vh" value={input} onChange={(e) => setInput(e.target.value)} variant="flushed" />
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Text fontSize="sm" color={secondaryColor}>Document id is unavailable on <code>/new</code>.</Text>
                <Text fontSize="sm" color={secondaryColor}>Notelabs is in beta.</Text>
            </Box>
        </Container>
    </>
}
