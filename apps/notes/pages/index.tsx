import { Layout, Nav, Sidebar } from "ui";
import { Box, Button, ButtonGroup, Container, Editable, EditableInput, EditablePreview, Heading, HStack, IconButton, Input, SimpleGrid, Skeleton, SkeletonText, Text, Tooltip, useColorMode, useColorModeValue, useEditableControls } from "@chakra-ui/react"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useColor } from "hooks"
import { signIn, useSession } from "next-auth/react"
import useSWR from "swr";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import { formatDistance } from 'date-fns'

export default function Notes() {
  let shadow = useColorModeValue("xs", "")
  let hoverShadow = useColorModeValue("xl", "")
  const secondaryColor = useColor({ color: "secondary" })

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR('/api/document/all', fetcher)

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
            {data && !error ? data.map((i: { summary: string; title: string; updatedAt: string; }) => (
              <Box p={5} borderWidth="1px" borderRadius={6}>
                <Box transition="all 0.3s ease" borderRadius={6} boxShadow={shadow} _hover={{ boxShadow: hoverShadow }} p={5} mb={5}>{i.summary}</Box>
                <Editable
                  defaultValue={i.title}
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
                <Text as="small" color={secondaryColor}>Edited {formatDistance(
                  new Date(i.updatedAt),
                  new Date(),
                  { addSuffix: true }
                )}</Text>
              </Box>
            )) : error ? "An error occured" : [...Array(5).keys()].map((i) => (
              <Box p={5} borderWidth="1px" borderRadius={6} key={i}>
                <Skeleton>
                  <Box transition="all 0.3s ease" borderRadius={6} boxShadow={shadow} _hover={{ boxShadow: hoverShadow }} p={5} mb={5}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</Box>
                </Skeleton>
                <SkeletonText>
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
                </SkeletonText>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Layout>
    </div>
  );
}
