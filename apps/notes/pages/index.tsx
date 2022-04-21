import { Layout, Nav, Sidebar } from "ui";
import { Box, Button, ButtonGroup, Container, Editable, EditableInput, EditablePreview, Heading, HStack, IconButton, Input, SimpleGrid, Text, Tooltip, useColorMode, useColorModeValue, useEditableControls } from "@chakra-ui/react"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useColor } from "hooks"
import { signIn, useSession } from "next-auth/react"

export default function Notes() {
  let shadow = useColorModeValue("xs", "")
  let hoverShadow = useColorModeValue("xl", "")
  const secondaryColor = useColor({ color: "secondary" })
  const {data, status} = useSession()
  console.log(data, status)

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup size="sm" spacing={2} mt={2}>
        <IconButton icon={<CheckIcon />} aria-label="Submit" {...getSubmitButtonProps()} />
        <IconButton
          icon={<CloseIcon boxSize={3} />}
          aria-label="Cancel"
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null;
  }


  return (
    <div>
      <Layout>
        <Container maxW="container.lg" mt={6}>
          <SimpleGrid columns={[1, null, 3]}>
            <Box p={5} borderWidth="1px" borderRadius={6}>
              <Box transition="all 0.3s ease" borderRadius={6} boxShadow={shadow} _hover={{ boxShadow: hoverShadow }} p={5} mb={5}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</Box>
              <Editable
                defaultValue="Document"
                isPreviewFocusable={true}
                selectAllOnFocus={false}
              >
                <Tooltip label="Click to edit">
                  <Heading py={2} mt={1} as={EditablePreview} size="sm" />
                </Tooltip>
                <HStack>
                  <Input pt={2.5} mb={0.5} size="md" variant="unstyled" fontWeight="bold" _focus={{ boxShadow: "none" }} fontFamily="Cal Sans, sans-serif" as={EditableInput} />
                  <EditableControls />
                </HStack>
              </Editable>
              <Text as="small" color={secondaryColor}>Edited yesterday</Text>
            </Box>
          </SimpleGrid>
          <Button onClick={() => signIn()}>Login</Button>
        </Container>
      </Layout>
    </div>
  );
}
