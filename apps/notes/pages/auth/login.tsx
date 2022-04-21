import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    SimpleGrid,
    Center,
    VStack,
    Icon,
    Text,
    Divider,
    FormErrorMessage,
    FormHelperText,
    Spacer,
} from '@chakra-ui/react';
import { Nav } from 'ui';
import { HiBeaker, HiCollection, HiDeviceMobile, HiDocumentDownload, HiKey, HiLightningBolt, HiPhone } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { signIn } from "next-auth/react"
import { useState } from 'react';
import Head from 'next/head';
import { FeatureList, list } from '../../lib/features';
import { Formik, Form, Field } from 'formik';

export default function Login() {
    let [isLoading, setLoading] = useState("")

    function signInGithub() {
        setLoading("github")
        signIn("github", { callbackUrl: "/app" })
    }

    function signInEmail(email: string) {
        setLoading("email")
        signIn("email", { callbackUrl: "/app", email })
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
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'3xl'}>Sign in or sign up</Heading>
                        <Text opacity={0.75}>Enter your email to sign in with a magic link, or sign in with a provider.</Text>
                        <Spacer />
                        <Formik
                            initialValues={{ email: '' }}
                            onSubmit={(values, actions) => {
                                setTimeout(() => {
                                    signInEmail(values.email)
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
                </Flex>
                <Flex flex={1}>
                    <Center w="full">
                        <SimpleGrid columns={[2, null, 3]} spacing={8}>
                            {list.map((i: FeatureList) => (
                                <VStack key={i.text}>
                                    <Icon as={i.icon} boxSize={8} />
                                    <Text size="sm" opacity={0.5}>{i.text}</Text>
                                </VStack>
                            ))}
                        </SimpleGrid>
                    </Center>
                </Flex>
            </Stack>
        </>
    );
}