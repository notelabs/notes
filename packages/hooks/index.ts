import { useColorModeValue } from "@chakra-ui/react"

type useColorTypes = {
    color: "secondary"
}

export function useColor({ color }: useColorTypes) {
    let selected
    switch (color) {
        case "secondary":
            selected = useColorModeValue("gray.500", "gray.400")
            break

        default:
            break
    }
    return selected
}