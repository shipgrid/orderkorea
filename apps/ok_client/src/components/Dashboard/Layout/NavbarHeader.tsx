'use client'

import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import {
  FiMenu,
  FiChevronDown,
  FiTruck
} from 'react-icons/fi'

import { 
  useNavigate 
} from 'react-router-dom'

import {
  startTransition
} from 'react'

interface MobileProps extends FlexProps {
  onOpen: () => void
}

type CombinedProps = MobileProps;

const NavbarHeader = ({ 
  onOpen, 
  ...rest 
}: CombinedProps) => {

  const navigate = useNavigate();


  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>
      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton 
          size="lg" 
          onClick={() => startTransition(() => navigate('/create-shipment'))}
          variant="ghost" 
          aria-label="open menu" 
          icon={<FiTruck />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  name='Emma Kim'
                  bg={'lightblue'}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Emma Kim</Text>
                  <Text fontSize="xs" color="gray.600">
                    User
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default NavbarHeader