import {
    Button,
    Flex,
    Heading,
    SimpleGrid,
    SlideFade,
    Stack,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import Head from 'next/head';
import Link from "next/link"
import AuthFeature from '../../components/AuthFeature';

export default function Error() {
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

    return (
        <>
            <Head>
                <title>An error occured - Notelabs</title>
            </Head>
            <SimpleGrid minH={'100vh'} columns={[1, null, 2]}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <SlideFade in={isOpen} offsetY="20px">
                        <Stack spacing={4} w={'full'} maxW={'md'}>
                            <Heading fontSize={'3xl'}>An error occured</Heading>
                            <Text opacity={0.75} pb={6}>Whilst you where trying to sign in, an error occured.</Text>
                            <Link href='/'>
                                <Button colorScheme="blue" onClick={onToggle}>
                                    Go home
                                </Button>
                            </Link>
                        </Stack>
                    </SlideFade>
                </Flex>
                <AuthFeature />
            </SimpleGrid>
        </>
    );
}