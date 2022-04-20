import { Nav } from "ui";
import { Box, Container, Heading, SimpleGrid, useColorModeValue } from "@chakra-ui/react"

export default function Notes() {
  let shadow = useColorModeValue("lg", "dark-lg")
  return (
    <div>
      <Nav title="Dashboard" />
      <Container maxW="container.lg" mt={6}>
        <SimpleGrid columns={[2, null, 3]}>
          <Box p={5} borderWidth="1px" borderRadius={6}>
            <Box boxShadow={shadow} p={2}>h</Box>
          </Box>
        </SimpleGrid>
      </Container>
    </div>
  );
}
