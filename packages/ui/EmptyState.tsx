import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { useColor } from 'hooks';
import { ReactNode } from 'react';

type EmptyStateProps = {
    icon?: ReactNode
    title: string
    description?: string
    button?: ReactNode
}

export function EmptyState ({ icon, title, description, button }: EmptyStateProps) {
    const selected = useColor({color: "selectedBg"})
    const selectedText = useColor({color: "selected"})
    return (
        <Box textAlign="center" py={10} px={6}>
          {icon ? icon : <InfoIcon boxSize={'50px'} color={useColorModeValue(selected, selectedText)} />}
          <Heading as="h2" size="xl" mt={6} mb={2}>
            {title}
          </Heading>
          <Text color={'gray.500'}>
            {description ? description : `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
            eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua.`}
          </Text>
          <Box mt={4}>
              {button && button}
          </Box>
        </Box>
      );
}