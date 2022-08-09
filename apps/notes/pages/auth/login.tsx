import {
    Button,
    Flex,
    FormControl,
    Heading,
    Input,
    Stack,
    SimpleGrid,
    Icon,
    Text,
    Divider,
    FormErrorMessage,
    FormHelperText,
    Spacer,
    SlideFade,
    useDisclosure,
    Container,
} from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';
import { signIn, useSession } from "next-auth/react"
import { useState } from 'react';
import Head from 'next/head';
import { Formik, Form, Field } from 'formik';
import { IoArrowBack } from 'react-icons/io5';
import NextLink from "next/link"
import AuthFeature from '../../components/AuthFeature';

export default function Login() {
    let [isLoading, setLoading] = useState("")
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            console.log('/')
        }
    })

    function signInGithub() {
        setLoading("github")
        onToggle()
        signIn("github", { callbackUrl: '/' })
    }

    function signInEmail(email: string) {
        setLoading("email")
        signIn("email", { email: email, callbackUrl: '/' })
    }

    function validateEmail(value: string) {
        let error
        if (!value) {
            error = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        ) {
            error = 'Invalid email address';
        }
        return error
    }


    return (
        <>
            <Head>
                <title>Login - Notelabs</title>
            </Head>
            <SimpleGrid minH={'100vh'} columns={[1, null, 2]}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Container pl={6} pos="absolute" top={8}>
                        <NextLink href="/">
                            <Button leftIcon={<IoArrowBack />} width="fit-content" size="sm" variant="ghost">
                                Go home
                            </Button>
                        </NextLink>
                    </Container>
                    <SlideFade in={isOpen} offsetY="20px">
                        <Stack spacing={4} w={'full'} maxW={'md'}>
                            <Heading fontSize={'3xl'} pt={{ base: 8, md: 0 }}>Sign in or sign up</Heading>
                            <Text opacity={0.75}>Enter your email to sign in with a magic link, or sign in with a provider.</Text>
                            <Spacer />
                            <Formik
                                initialValues={{ email: '' }}
                                onSubmit={(values, actions) => {
                                    setTimeout(() => {
                                        signInEmail(values.email)
                                        onToggle()
                                        actions.setSubmitting(false)
                                    }, 1000)
                                }}
                            >
                                {(props) => (
                                    <Form>
                                        <Stack spacing={4}>
                                            <Field name='email' validate={validateEmail}>
                                                {({ field, form }: any) => (
                                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                        <Input {...field} required type="email" placeholder='Enter an email' id='name' />
                                                        {form.errors.email ? <FormErrorMessage>{form.errors.email}</FormErrorMessage> : <FormHelperText>No spam, emails once a quarter at most</FormHelperText>}
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Button type="submit" isFullWidth colorScheme={'blue'} variant={'solid'} isLoading={isLoading === "email" || props.isSubmitting} isDisabled={props.values.email === '' || props.errors.email ? true : false}>
                                                Sign in
                                            </Button>
                                        </Stack>
                                    </Form>
                                )}
                            </Formik>
                            <Divider py={3} />
                            <Button colorScheme="gray" leftIcon={<Icon as={FaGithub} />} onClick={signInGithub} isLoading={isLoading === "github"}>
                                Continue with GitHub
                            </Button>
                        </Stack>
                    </SlideFade>
                </Flex>
                <AuthFeature />
            </SimpleGrid>
        </>
    );
}