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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Radio
} from '@chakra-ui/react';

import { FiTruck } from "react-icons/fi";

interface DrawerProps {
  title: string,
  color: string
}

function DrawerExample({ 
  title,
  color
}:DrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null); 

  return (
    <>
      <Button leftIcon={<FiTruck/>} ref={btnRef} colorScheme={color} onClick={onOpen} size={'sm'}>
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
            <DrawerHeader>Review shipping rates</DrawerHeader>
            <DrawerBody>
            <TableContainer borderWidth='1px' borderRadius='lg' mt={10}>
              <Table variant='simple'>
                <TableCaption>All prices listed in USD</TableCaption>
                <Thead>
                <Tr>
                    <Th>carrier</Th>
                    <Th>Price</Th>
                    <Th>Select</Th>
                </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>UPS -  International Standard</Td>
                    <Td>$49.94</Td>
                    <Td> <Radio size='lg' name='1'> </Radio></Td>
                  </Tr>
                  <Tr>
                    <Td>Korea Post - Express Mail Service</Td>
                    <Td>$36.43</Td>
                    <Td> <Radio size='lg' name='2'> </Radio></Td>
                  </Tr>
                  <Tr>
                    <Td>Korea Post - K-Packet</Td>
                    <Td>$23.86</Td>
                    <Td> <Radio size='lg' name='3'> </Radio></Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
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