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
} from '@chakra-ui/react';
import { Nav } from 'ui';
import { HiBeaker, HiCollection, HiDeviceMobile, HiDocumentDownload, HiKey, HiLightningBolt, HiPhone } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { signIn } from "next-auth/react"
import { useState } from 'react';

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

export default function Login() {
    let [isLoading, setLoading] = useState("")

    function signInGithub () {
        setLoading("github")
        signIn("github", {callbackUrl: "/app"})
    }

    return (
        <>
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'3xl'}>Sign in to your account</Heading>
                        <Text opacity={0.75}>Enter your email to sign in with a magic link, or sign in with a provider.</Text>
                        <FormControl id="email">
                            <Input type="email" placeholder='Enter an email' />
                        </FormControl>
                        <Stack spacing={6}>
                            <Button colorScheme={'blue'} variant={'solid'}>
                                Sign in
                            </Button>
                        </Stack>
                        <Divider py={3} />
                        <Button colorScheme="gray" leftIcon={<Icon as={FaGithub} />} onClick={signInGithub} isLoading={isLoading === "github"}>
                            Continue with GitHub
                        </Button>
                    </Stack>
                </Flex>
                <Flex flex={1}>
                    <Center w="full">
                        <SimpleGrid columns={[1, null, 3]} spacing={8}>
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