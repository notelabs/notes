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
    Avatar,
    AvatarBadge,
    IconButton,
    SkeletonCircle,
    Box,
    HStack,
    Skeleton,
    Tooltip,
} from '@chakra-ui/react';
import { Nav } from 'ui';
import { HiBeaker, HiCollection, HiDeviceMobile, HiDocumentDownload, HiKey, HiLightningBolt, HiPhone } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { signIn } from "next-auth/react"
import { useState } from 'react';
import Head from 'next/head';
import { SmallCloseIcon } from '@chakra-ui/icons';
import avatar from "gradient-avatar"
import email from 'next-auth/providers/email';
import { FiChevronDown } from 'react-icons/fi';
import { FeatureList, list } from '../../lib/features';

export default function Login() {
    let [isLoading, setLoading] = useState("")
    let [name, setName] = useState("")

    return (
        <>
            <Head>
                <title>Almost there - Notelabs</title>
            </Head>
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <Heading fontSize={'3xl'}>We&apos;ll need a few more details</Heading>
                        <Text opacity={0.75}>We&apos;ll need to know your name, which will allow us to generate an avatar for you.</Text>
                        <HStack pt={6}>
                            <Tooltip label="Start typing to generate an avatar">
                                <Avatar src={`/app/api/avatar/${name ? name : "hi"}`} icon={<SkeletonCircle height="full" width="full" />}>
                                </Avatar>
                            </Tooltip>
                            <VStack
                                display="flex"
                                alignItems="flex-start"
                                spacing="1px"
                                ml="2">
                                <Tooltip label="Start typing to generate an avatar">
                                    <Text fontSize="sm">{name ? name : "Start typing"}</Text>
                                </Tooltip>
                                <Text fontSize="xs" color="gray.600">
                                    Admin
                                </Text>
                            </VStack>
                        </HStack>
                        <FormControl id="name">
                            <Input required autoComplete='off' type="text" placeholder="What's your name" value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <Stack spacing={6}>
                            <Button colorScheme={'blue'} variant={'solid'}>
                                Confirm details
                            </Button>
                        </Stack>
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