import {
    Button,
    Flex,
    FormControl,
    Heading,
    Input,
    Stack,
    VStack,
    Text,
    Avatar,
    SkeletonCircle,
    HStack,
    Tooltip,
    FormErrorMessage,
    Skeleton,
    FormHelperText,
    useToast,
    SimpleGrid,
    useDisclosure,
    SlideFade,
} from '@chakra-ui/react';
import Head from 'next/head';
import { Formik, Form, Field } from 'formik';
import axios from "axios"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'
import AuthFeature from '../../components/AuthFeature';
import Link from 'next/link';

export default function Login() {
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            console.log('/auth/login')
        }
    })
    const router = useRouter()
    const toast = useToast()

    function validateName(value: string) {
        let error
        if (!value && !session?.user?.name) {
            error = 'Name is required'
        }
        return error
    }

    return (
        <>
            <Head>
                <title>Almost there - Notelabs</title>
            </Head>
            <SimpleGrid minH={'100vh'} columns={[1, null, 2]}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <SlideFade in={isOpen} offsetY="20px">
                        <Stack spacing={4} w={'full'} maxW={'md'}>
                            <Heading fontSize={'3xl'}>We&apos;ll need a few more details</Heading>
                            <Text opacity={0.75}>We&apos;ll need to know your name, which will allow us to generate an avatar for you.</Text>
                            <Formik
                                initialValues={{ name: status === "authenticated" && session?.user?.name ? session.user.name : '' }}
                                onSubmit={(values, actions) => {
                                    setTimeout(() => {
                                        axios.post("/api/set-user-details", {
                                            name: values.name,
                                            image: `/api/avatar/${values.name}`,
                                            email: session?.user?.email
                                        }).then(() => {
                                            onToggle()
                                            router.push('/')
                                        }).catch((err) => {
                                            toast({
                                                title: "An error occured",
                                                description: "Try again later",
                                                status: "error"
                                            })
                                        })
                                        actions.setSubmitting(false)
                                    }, 1000)
                                }}
                            >
                                {(props) => (
                                    <>
                                        <Tooltip label="Start typing to generate an avatar" shouldWrapChildren>
                                            <HStack pt={6} maxW="100%" spacing={3}>

                                                <Avatar src={session?.user?.image && !props.values.name ? session.user.image : `/api/avatar/${props.values.name ? props.values.name : "hi"}`} icon={<SkeletonCircle height="full" width="full" />}>
                                                </Avatar>
                                                <VStack
                                                    display="flex"
                                                    alignItems="flex-start"
                                                    spacing="1px"
                                                    ml="2">
                                                    <Text fontSize="sm" isTruncated maxW="100%">{session?.user?.name && !props.values.name ? session.user.name : props.values.name ? props.values.name : "Start typing"}</Text>
                                                    <Text fontSize="xs" color="gray.600">
                                                        Admin
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                        </Tooltip>
                                        <Form>
                                            {session ? <Field name='name' validate={validateName}>
                                                {({ field, form }: any) => (
                                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                        <Input {...field} id='name' autoComplete='off' type="text" placeholder="What's your name" />
                                                        {form.errors.name && <FormErrorMessage>{form.errors.name}</FormErrorMessage>}
                                                        {session.user?.name && <FormHelperText>Leave blank to use the name shown above</FormHelperText>}
                                                    </FormControl>
                                                )}
                                            </Field> : <Skeleton rounded="base">
                                                <FormControl>
                                                    <Input id='name' autoComplete='off' type="text" placeholder="What's your name" />
                                                    <FormErrorMessage>Hi</FormErrorMessage>
                                                </FormControl>
                                            </Skeleton>}
                                            <Button
                                                mt={4}
                                                colorScheme={'blue'}
                                                variant={'solid'}
                                                isLoading={props.isSubmitting}
                                                isDisabled={!session}
                                                type='submit'
                                                isFullWidth
                                            >
                                                Confirm details
                                            </Button>
                                        </Form>
                                    </>
                                )}
                            </Formik>
                        </Stack>
                    </SlideFade>
                </Flex>
                <AuthFeature />
            </SimpleGrid>
        </>
    );
}