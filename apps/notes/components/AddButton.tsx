import { AddIcon } from "@chakra-ui/icons"
import { Text, Box, useDisclosure } from "@chakra-ui/react"
import Link from "next/link"
import styles from "../styles/animate.module.css"

export default function AddButton() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Link href="/document/new">
                <Box as="button" onClick={onOpen} _focus={{ boxShadow: "outline", outline: "none" }} transition="all 0.1s ease" className={styles.border} p={5} borderRadius={6} display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={4} cursor="pointer">
                    <Box py={8}>
                        <AddIcon boxSize={8} opacity={0.5} />
                        <Text opacity={0.6}>New document</Text>
                    </Box>
                </Box>
            </Link>
        </>
    )
}