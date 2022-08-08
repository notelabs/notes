import { useState } from 'react';
import {
    Stack,
    FormControl,
    Input,
    Button,
    Heading,
    Text,
    Flex,
    useToast,
    Center,
    SimpleGrid,
    VStack,
    Box,
    FormErrorMessage,
    FormHelperText,
    Spacer,
    Container,
    SlideFade,
    useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import Head from 'next/head';
import { FeatureList, list } from '../lib/features';
import NextLink from "next/link"
import { IoArrowBack } from 'react-icons/io5';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/router';
import AuthFeature from '../components/AuthFeature';

export default function Simple() {
    let [isDisabled, setDisabled] = useState(false)
    const toast = useToast()
    const router = useRouter()
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

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
                <title>Waitlist - Notelabs</title>
            </Head>
            <SimpleGrid minH={'100vh'} columns={[1, null, 2]}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Container pl={6} pos="absolute" top={8}>
                        <NextLink href="https://notelabs.me">
                            <Button leftIcon={<IoArrowBack />} width="fit-content" size="sm" variant="ghost">
                                Go home
                            </Button>
                        </NextLink>
                    </Container>
                    <SlideFade in={isOpen} offsetY="20px">
                        <Stack spacing={4} w={'full'} maxW={'md'}>
                            <Heading fontSize={'3xl'} pt={{ base: 8, md: 0 }}>Join the waitlist</Heading>
                            <Text opacity={0.75}>Get ready to experience Notelabs, the best note taking app on earth.</Text>
                            <Spacer />
                            <Formik
                                initialValues={{ email: '' }}
                                onSubmit={(values, actions) => {
                                    axios.post("/api/waitlist", {
                                        email: values.email
                                    }).then(() => {
                                        toast({
                                            title: "Success",
                                            description: "You are now on the waitlist, we're sending you home.",
                                            status: "success"
                                        })
                                        setDisabled(true)
                                        setTimeout(() => {
                                            onToggle()
                                            router.push("https://notelabs.me")
                                        }, 2000)
                                    }).catch((err) => {
                                        toast({
                                            title: "An error occured",
                                            description: "Try again later, or check you aren't already signed up.",
                                            status: "error"
                                        })
                                    })
                                    actions.setSubmitting(false)
                                }}
                            >
                                {(props) => (
                                    <Form>
                                        <Stack spacing={4}>
                                            <Field name='email' validate={validateEmail}>
                                                {({ field, form }: any) => (
                                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                        <Input {...field} required type="email" placeholder='Enter an email' id='name' isDisabled={isDisabled} />
                                                        {form.errors.email ? <FormErrorMessage>{form.errors.email}</FormErrorMessage> : <FormHelperText>No spam, emails once a quarter at most</FormHelperText>}
                                                    </FormControl>
                                                )}
                                            </Field>
                                            <Button type="submit" isFullWidth colorScheme={'blue'} variant={'solid'} isLoading={props.isSubmitting} isDisabled={isDisabled || props.values.email === '' || props.errors.email ? true : false}>
                                                Join waitlist
                                            </Button>
                                        </Stack>
                                    </Form>
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
