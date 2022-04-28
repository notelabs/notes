import { Layout } from "ui";
import { Box, ButtonGroup, Container, Editable, EditableInput, EditablePreview, Heading, HStack, IconButton, Input, SimpleGrid, Skeleton, SkeletonText, Text, Tooltip, useColorModeValue, useEditableControls, useToast } from "@chakra-ui/react"
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useColor } from "hooks"
import useSWR, { useSWRConfig } from "swr";
import { formatDistance } from 'date-fns'
import NextLink from 'next/link'
import axios from "axios";
import styles from "../styles/animate.module.css"

export default function Notes() {
  let shadow = useColorModeValue("xs", "")
  let hoverShadow = useColorModeValue("xl", "")
  const secondaryColor = useColor({ color: "secondary" })

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR('/api/document/all', fetcher)
  const toast = useToast()
  const { mutate } = useSWRConfig()

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

  function RightClickEdit({ children }: any) {
    const { getEditButtonProps } = useEditableControls()
    const btn = getEditButtonProps()

    return (
      <Box onContextMenu={(e) => {
        e.preventDefault()
        // @ts-ignore
        btn.onClick()
      }}>
        {children}
      </Box>
    )
  }


  return (
    <div>
      <Layout>
        <Container maxW="container.lg" mt={6}>
          <SimpleGrid columns={[1, null, 3]} spacing={4}>
            {data && !error ? data.map((i: { summary: string; title: string; updatedAt: string; id: string; }) => (
              <>
                <Box p={5} borderWidth="1px" borderRadius={6}>
                  <NextLink href={`/document/${encodeURIComponent(i.id)}`}>
                    <Box cursor="pointer" transition="all 0.3s ease" borderRadius={6} boxShadow={shadow} _hover={{ boxShadow: hoverShadow }} p={5} mb={5}>{i.summary}</Box>
                  </NextLink>
                  <Editable
                    defaultValue={i.title}
                    isPreviewFocusable={false}
                    selectAllOnFocus={false}
                    onSubmit={(nextValue: string) => {
                      axios.post('/api/document/update/title', { id: i.id, title: nextValue }).then(() => {
                        toast({
                          status: "success",
                          title: "Document renamed successfully"
                        })
                      }).catch(() => {
                        toast({
                          status: "error",
                          title: "An error occured renaming your document"
                        })
                      })
                      mutate('/api/document/all');
                    }}
                  >
                    <RightClickEdit>
                      <Tooltip shouldWrapChildren label="Right click to rename">
                        <NextLink href={`/document/${encodeURIComponent(i.id)}`}>
                          <Heading cursor="pointer" py={2} mt={1} as={EditablePreview} size="sm" />
                        </NextLink>
                      </Tooltip>
                    </RightClickEdit>
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
                <Box className={styles.border} p={5} borderRadius={6} display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap={4} cursor="pointer">
                  <AddIcon boxSize={8} opacity={0.5} />
                  <Text opacity={0.6}>New document</Text>
                </Box>
              </>
            )) : error ? "An error occured" : [...Array(5).keys()].map((i) => (
              <Box p={5} borderWidth="1px" borderRadius={6} key={i}>
                <Skeleton>
                  <Box transition="all 0.3s ease" borderRadius={6} boxShadow={shadow} _hover={{ boxShadow: hoverShadow }} p={5} mb={5}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</Box>
                </Skeleton>
                <SkeletonText>
                  <Editable
                    defaultValue="Document"
                    isPreviewFocusable={false}
                    selectAllOnFocus={false}
                  >
                    <RightClickEdit>
                      <Tooltip label="Right click to rename">
                        <Heading py={2} mt={1} as={EditablePreview} size="sm" />
                      </Tooltip>
                    </RightClickEdit>
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
