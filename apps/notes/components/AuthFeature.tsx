import {
    Link,
    Text,
    Box,
} from '@chakra-ui/react';
import Image from "next/future/image"
import auth_bg from "../public/auth_bg.jpg"
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function AuthFeature() {
    return <Box>
        <Image style={{ height: "100%", objectFit: "cover" }} src={auth_bg} />
        <Text color="white" pos="relative" bottom={12} left={12} w="fit-content">
            Photo by <Link href="https://unsplash.com/@simonppt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText" isExternal>SIMON LEE <ExternalLinkIcon /></Link> on <Link isExternal href="https://unsplash.com/t/3d-renders?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash <ExternalLinkIcon />.</Link>
        </Text>
    </Box>
}