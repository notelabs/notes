import {
    Button,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';
import Link from "next/link"
import Head from 'next/head';
import AuthFeature from '../../components/AuthFeature';

export default function Verify() {

    return (
        <>
            <Head>
                <title>Magic link sent - Notelabs</title>
            </Head>
            <SimpleGrid minH={'100vh'} columns={[1, null, 2]}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'3xl'}>Magic link sent</Heading>
                        <Text opacity={0.75} pb={6}>Check your email for your magic link, which will allow you to sign in.</Text>
                        <Link href='/'>
                            <Button colorScheme="blue">
                                Go home
                            </Button>
                        </Link>
                    </Stack>
                </Flex>
                <AuthFeature />
            </SimpleGrid>
        </>
    );
}