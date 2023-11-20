'use client'

import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  BoxProps,
} from '@chakra-ui/react'

import {
  FiDollarSign,
  FiShoppingBag,
  FiTruck,
  FiGrid,
} from 'react-icons/fi'

import { 
  IconType 
} from 'react-icons'

import NavItem from './NavItem'

interface LinkItemProps {
  name: string
  icon: IconType,
  link: string,
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Orders', icon: FiShoppingBag, link: '/orders' },
  { name: 'Inventory', icon: FiGrid, link: '/inventory' },
  { name: 'Shipments', icon: FiTruck, link: '/shipments' },
  { name: 'Billing', icon: FiDollarSign, link: '/billing' },
]

const SidebarContent = ({ 
  onClose, 
  ...rest 
}: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

export default SidebarContent