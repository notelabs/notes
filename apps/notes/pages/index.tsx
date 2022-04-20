import { Nav } from "ui";
import { Box, ButtonGroup, Container, Editable, EditableInput, EditablePreview, Heading, HStack, IconButton, Input, SimpleGrid, Text, Tooltip, useColorModeValue, useEditableControls } from "@chakra-ui/react"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export default function Notes() {
  let shadow = useColorModeValue("xs", "")
  let hoverShadow = useColorModeValue("xl", "")

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup size="sm" spacing={2} mt={2}>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null;
  }


  return (
    <div>
      <Nav title="Dashboard" />
      <Container maxW="container.lg" mt={6}>
        <SimpleGrid columns={[2, null, 3]}>
          <Box p={5} borderWidth="1px" borderRadius={6}>
            <Box transition="all 0.3s ease" borderRadius={6} boxShadow={shadow} _hover={{ boxShadow: hoverShadow }} p={5} mb={5}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</Box>
            <Editable
              defaultValue="Document"
              isPreviewFocusable={true}
              selectAllOnFocus={false}
              startWithEditView
            >
              <Tooltip label="Click to edit">
                <Heading py={2} pb={3} mt={0.5} as={EditablePreview} size="sm" />
              </Tooltip>
              <HStack>
              <Input py={1} px={0} size="md" variant="flushed" fontWeight="bold" as={EditableInput} />
              <EditableControls />
              </HStack>
            </Editable>
            <Text as="small" color="ActiveCaption">Edited yesterday</Text>
          </Box>
        </SimpleGrid>
      </Container>
    </div>
  );
}
