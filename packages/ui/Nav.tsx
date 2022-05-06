import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Heading,
    Container,
    Tooltip
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { Fade } from '.';
import Head from "next/head"
import useSWR from "swr"
import { IoApps, IoSunny, IoMoon, IoEllipsisVertical } from "react-icons/io5"

type NavProps = {
    links?: NavLinkProps[]
    title?: string
}

type MarketingNavProps = {
    links?: NavLinkProps[]
    delay?: number
    appUrl?: string
}

type NavLinkProps = {
    name: string
    href: string
}

const NavLink = ({ name, href }: NavLinkProps) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={href}>
        {name}
    </Link>
);

export function MarketingNav({ links, delay, appUrl }: MarketingNavProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode()

    links ??= []

    return (
        <Fade delay={delay ? delay : 1.6}>
            <Container maxW="container.lg" px={4} py={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Heading size="md" py={2}>Notelabs</Heading>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {links.map((link) => (
                                <NavLink key={link.href} name={link.name} href={link.href} />
                            ))}
                        </HStack>
                    </HStack>
                    <HStack alignItems={'center'} spacing={2}>
                        <Tooltip label="Toggle theme">
                            <IconButton variant="ghost" rounded="full" aria-label='Toggle theme' onClick={toggleColorMode} icon={colorMode === "light" ? <IoMoon /> : <IoSunny />} />
                        </Tooltip>
                        <Menu>
                            <Tooltip label="Menu">
                                <MenuButton
                                    as={IconButton}
                                    icon={<IoEllipsisVertical />}
                                    rounded={'full'}
                                    variant={'ghost'}
                                    cursor={'pointer'}
                                >
                                </MenuButton>
                            </Tooltip>
                            <MenuList>
                                <Link href={appUrl}>
                                    <MenuItem>Go to app</MenuItem>
                                </Link>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {links.map((link) => (
                                <NavLink key={link.href} name={link.name} href={link.href} />
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Container>
        </Fade>
    );
}

export function Nav({ links, title }: NavProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode()

    let linksUndefined = !links

    links ??= []
    title ??= "Notelabs"

    return (
        <>
            <Head>
                <title>{title === "Notelabs" ? title : `${title} - Notelabs`}</title>
            </Head>
            <Container maxW="container.lg" px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                        isDisabled={linksUndefined}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Heading size="md" py={2}>{title}</Heading>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            {links.map((link) => (
                                <NavLink key={link.href} name={link.name} href={link.href} />
                            ))}
                        </HStack>
                    </HStack>
                    <HStack alignItems={'center'} spacing={4}>
                        <IconButton variant="ghost" rounded="full" aria-label='Toggle theme' onClick={toggleColorMode} icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} />
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Link 1</MenuItem>
                                <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {links.map((link) => (
                                <NavLink key={link.href} name={link.name} href={link.href} />
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Container>
        </>
    );
}