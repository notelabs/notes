import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    SimpleGrid,
    Center,
    VStack,
    Icon,
    Text,
    Divider,
} from '@chakra-ui/react';
import { Nav } from 'ui';
import { HiBeaker, HiCollection, HiDeviceMobile, HiDocumentDownload, HiKey, HiLightningBolt, HiPhone } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { signIn } from "next-auth/react"
import { useState } from 'react';
import Head from 'next/head';
import Link from "next/link"
import { FeatureList, list } from '../../lib/features';

export default function Error() {
    let [isLoading, setLoading] = useState("")
    let [email, setEmail] = useState("")

    function signInGithub () {
        setLoading("github")
        signIn("github")
    }

    function signInEmail (email: string) {
        setLoading("email")
        signIn("email", {email: email})
    }

    return (
        <>
            <Head>
                <title>An error occured - Notelabs</title>
            </Head>
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'3xl'}>An error occured</Heading>
                        <Text opacity={0.75} pb={6}>Whilst you where trying to sign in, an error occured.</Text>
                        <Link href='/'>
                            <Button colorScheme="blue">
                                Go home
                            </Button>
                        </Link>
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