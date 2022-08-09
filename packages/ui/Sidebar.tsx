import React, { ReactNode } from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Heading,
    SkeletonCircle,
    Skeleton,
    Spacer,
    Grid,
    ButtonGroup,
    useColorMode,
    Divider
} from '@chakra-ui/react';
import {
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';
import { RiSunFill, RiMoonFill, RiGithubFill, RiTwitterFill } from 'react-icons/ri'
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { useColor } from "hooks";
import { useSession, signIn, signOut } from "next-auth/react"
import NextLink from "next/link"


type SidenavProps = {
    links: LinkItemProps[]
    title?: string
    children: ReactNode
    selectedName?: string
}

export interface LinkItemProps {
    name: string;
    icon: IconType;
    href: string;
}

export function Sidebar({
    children,
    title,
    links,
    selectedName
}: SidenavProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    title ??= "Notelabs"

    return (
        <Box minH="100vh">
            <SidebarContent
                title={title}
                linkItems={links}
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
                selectedName={selectedName}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent linkItems={links} title={title} onClose={onClose} selectedName={selectedName} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} title={title} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    title: string
    linkItems: LinkItemProps[]
    selectedName?: string
}

const SidebarContent = ({ onClose, title, linkItems, selectedName, ...rest }: SidebarProps) => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Heading fontSize="2xl" fontWeight="bold">
                    {title}
                </Heading>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            <Grid h="91vh" templateColumns="auto" gridTemplateRows="auto auto auto">
                <Box>
                    {linkItems.map((link) => (
                        <NavItem key={link.name} href={link.href} icon={link.icon} selected={selectedName === link.name ? true : false}>
                            {link.name}
                        </NavItem>
                    ))}
                </Box>
                <Spacer />
                <Flex justifyContent="end" direction="column" p={4} px={6} mb={4}>
                    <Text as="i" fontSize="xs" opacity={0.75}>Write something awesome</Text>
                    <Divider my={4} />
                    <ButtonGroup size="sm" variant="ghost" justifyContent="space-between" w="full">
                        <Box>
                            <Link href="https://github.com/notelabs" tabIndex={-1}>
                                <IconButton aria-label='GitHub' icon={<Icon as={RiGithubFill} />} />
                            </Link>
                            <Link href="https://twitter.com/trynotelabs" tabIndex={-1}>
                                <IconButton aria-label='Twitter' icon={<Icon as={RiTwitterFill} />} />
                            </Link>
                        </Box>
                        <IconButton onClick={toggleColorMode} aria-label='Toggle theme' icon={<Icon as={colorMode === "light" ? RiSunFill : RiMoonFill} />} />
                    </ButtonGroup>
                </Flex>
            </Grid>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    href: string
    selected?: boolean
}
const NavItem = ({ icon, children, href, selected, ...rest }: NavItemProps) => {
    const selectedBg = useColor({ color: "selectedBg" })
    const selectedHover = useColor({ color: "selectedHover" })
    const selectedColor = useColor({ color: "selected" })
    const hover = useColor({ color: "hover" })

    return (
        <NextLink passHref href={href}>
            <Link role="group" style={{ textDecoration: 'none' }} _focus={{ outline: "none" }} borderRadius="lg" tabIndex={0}>
                <Flex
                    align="center"
                    p="2"
                    mx="4"
                    px={3}
                    my={1}
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    bg={selected ? selectedBg : undefined}
                    color={selected ? selectedColor : undefined}
                    _hover={{
                        background: selected ? selectedHover : hover
                    }}
                    _groupFocus={{ boxShadow: "outline" }}
                    {...rest}>
                    {icon && (
                        <Icon
                            mr="4"
                            fontSize="16"
                            as={icon}
                        />
                    )}
                    {children}
                </Flex>
            </Link>
        </NextLink>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
    title: string
}
const MobileNav = ({ onOpen, title, ...rest }: MobileProps) => {
    const { data: session, status } = useSession()

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Heading
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontWeight="bold">
                {title}
            </Heading>

            <HStack spacing={{ base: '4', md: '6' }}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            p={2}
                            transition="all 0.3s"
                            borderRadius={6}
                            _focus={{ boxShadow: "outline" }}
                        >
                            <HStack>
                                <SkeletonCircle isLoaded={status !== "loading"}>
                                    <Avatar
                                        size={'sm'}
                                        src={session?.user?.image ? session?.user?.image : ''}
                                    />
                                </SkeletonCircle>
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    pl={session ? 2 : 0}
                                >
                                    <Skeleton isLoaded={status !== "loading"}>
                                        <Text fontSize="sm">{session?.user?.name}</Text>
                                    </Skeleton>
                                    <Skeleton isLoaded={status !== "loading"}>
                                        <Text fontSize="xs" color="gray.600" hidden={status === "unauthenticated"}>
                                            Admin
                                        </Text>
                                    </Skeleton>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}
                        >
                            <Box hidden={status !== "authenticated"}>
                                <Link as={NextLink} style={{ textDecoration: 'none' }} href='/auth/set-details'>
                                    <MenuItem>Profile</MenuItem>
                                </Link>
                                <MenuDivider />
                                <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
                            </Box>
                            <Box hidden={status === "authenticated"}>
                                <MenuItem onClick={() => signIn()}>Sign in</MenuItem>
                            </Box>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};