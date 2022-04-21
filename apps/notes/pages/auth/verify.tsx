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
import { signIn } from "next-auth/react"
import { useState } from 'react';
import Link from "next/link"
import Head from 'next/head';

type FeatureList = {
    icon: typeof HiBeaker
    text: string
}

const list: FeatureList[] = [
    {
        icon: HiBeaker,
        text: "Beta program"
    },
    {
        icon: HiLightningBolt,
        text: "Fast UI"
    },
    {
        icon: HiKey,
        text: "Secure data"
    },
    {
        icon: HiDeviceMobile,
        text: "Mobile website"
    },
    {
        icon: HiDocumentDownload,
        text: "Own your data"
    },
    {
        icon: HiCollection,
        text: "Draggable"
    }
]

export default function Verify() {
    let [isLoading, setLoading] = useState("")
    let [email, setEmail] = useState("")

    function signInGithub () {
        setLoading("github")
        signIn("github", {callbackUrl: "/app"})
    }

    function signInEmail (email: string) {
        setLoading("email")
        signIn("email", {callbackUrl: "/app", email})
    }

    return (
        <>
            <Head>
                <title>Magic link sent - Notelabs</title>
            </Head>
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
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