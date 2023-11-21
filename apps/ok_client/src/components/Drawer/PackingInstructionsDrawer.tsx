import { 
  useRef 
} from 'react';

import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Box,
  Text,
  VStack,
  Textarea,
  Heading,
  Checkbox
} from '@chakra-ui/react';

import { 
  FiClipboard 
} from 'react-icons/fi';


interface DrawerProps {
  title: string,
  color: string
}

function DrawerExample({ 
  title, 
  color 
}:DrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null); // Specify the type for btnRef

  return (
    <>
      <Button leftIcon={<FiClipboard/>} ref={btnRef} colorScheme={color} onClick={onOpen} size={'sm'}>
        { title }
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='lg'
      >
        <DrawerOverlay />
        <DrawerContent>
          <Box>
            <DrawerCloseButton />
            <DrawerHeader>Review Packing Instructions</DrawerHeader>
            <DrawerBody>
              <VStack
                align='stretch'
                py={3}
              >
                <Checkbox defaultChecked>Gift Wrapping</Checkbox>
                <Checkbox defaultChecked>Extra Padding</Checkbox>
                <Checkbox defaultChecked>Add Bubble Wrap</Checkbox>
                <Checkbox defaultChecked>Inclusions Only</Checkbox>
              </VStack>
              <VStack
                py={3}
                align='stretch'
              >
                <Heading size='sm'> Extra Details</Heading>
                <Text fontSize='xs' color={'gray'}>
                  If you have selected for inclusions only, please use the below area to describe specific instructions.
                </Text>
                <Box py={2}>
                  <Textarea placeholder='Provide extra instructions here...'   size='sm'/>
                </Box>
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
            </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerExample;