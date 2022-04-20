import { useColorModeValue } from "@chakra-ui/react"

type useColorTypes = {
    color: "secondary" | "hover"
}

export function useColor({ color }: useColorTypes) {
    let selected
    switch (color) {
        case "secondary":
            selected = useColorModeValue("gray.500", "gray.400")
            break
        case "hover":
            selected = useColorModeValue("gray.100", "gray.700")
            break

        default:
            break
    }
    return selected
}