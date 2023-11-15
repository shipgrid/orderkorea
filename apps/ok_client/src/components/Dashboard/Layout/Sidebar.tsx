'use client'

import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react'

import { 
  ReactNode 
} from "react";

import SidebarContent from './SidebarContent';
import Navbar from './NavbarHeader'

interface SidebarWithHeaderProps {
  content: ReactNode; 
}

const SidebarWithHeader = ({
  content 
}: SidebarWithHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Navbar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {content}
      </Box>
    </Box>
  )
}

export default SidebarWithHeader