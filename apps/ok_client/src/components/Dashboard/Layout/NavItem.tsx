'use client'

import {
  Box,
  Flex,
  Icon,
  FlexProps,
} from '@chakra-ui/react'

import { 
  IconType 
} from 'react-icons'

import React from "react";

import { 
  useNavigate 
} from 'react-router-dom'

import {
  startTransition
} from 'react'

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode,
  link: string
}

const NavItem = ({ 
  icon, 
  link,
  children, 
  ...rest 
}: NavItemProps) => {

  const navigate = useNavigate();
  
  return (
    <Box
      as="a"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      onClick={() => startTransition(() => navigate(link))}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

export default NavItem