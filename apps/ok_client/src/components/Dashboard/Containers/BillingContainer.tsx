import {
  Stack,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  Flex,
  Box,
  Heading,
  Tag,
  Text,
  Button,
  Progress,
  TagLabel,
  HStack,
  Divider
} from '@chakra-ui/react';

import { FaArrowRight } from "react-icons/fa";

import { FiPackage } from 'react-icons/fi'

const BillingContainer = () => {
  return (
    <Stack minH={'100vh'}>
      <Flex justifyContent={'space-between'}>
        <Box>
          <Heading size='md'>
            Order Overview
          </Heading>
          <Text py={1} color='gray'> Select your inventory and start creating your shipments. </Text>
        </Box>
        {/* <Box>
          <Button colorScheme="blue" size='md' fontSize="md" rightIcon={<FaArrowRight />}>
            Create a Purchase Order
          </Button>
        </Box> */}
      </Flex>
      <Divider/>
      <TableContainer bg='white' borderRadius={'md'}>
        <Table variant='simple'>
          <TableCaption>Accurate as of {new Date().toISOString()}</TableCaption>
          <Thead>
            <Tr>
              <Th>Billing</Th>
              <Th>Created</Th>
              <Th>Email</Th>
              <Th>Total</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>10</Td>
              <Td>{new Date().toISOString()}</Td>
              <Td>
              <Tag
                size={'md'}
                borderRadius='full'
                variant='solid'
                colorScheme='blue'
              >
                <TagLabel>hello@orderkorea.kr</TagLabel>
              </Tag>
              </Td>
              <Td>USD 189.99</Td>
              <Td><Button colorScheme='yellow' size='md' rightIcon={<FaArrowRight />}> Send Invoice to Email </Button></Td>
            </Tr>
            <Tr>
              <Td>11</Td>
              <Td>{new Date().toISOString()}</Td>
              <Td>
                <Tag
                  size={'md'}
                  borderRadius='full'
                  variant='solid'
                  colorScheme='blue'
                >
                  <TagLabel>hello@orderkorea.kr</TagLabel>
                </Tag>
              </Td>
              <Td>USD 189.99</Td>
              <Td><Button colorScheme='yellow' size='md' rightIcon={<FaArrowRight />}> Send Invoice to Email </Button></Td>
            </Tr>
            <Tr>
              <Td>12</Td>
              <Td>{new Date().toISOString()}</Td>
              <Td>
                <Tag
                  size={'md'}
                  borderRadius='full'
                  variant='solid'
                  colorScheme='blue'
                  >
                  <TagLabel>hello@orderkorea.kr</TagLabel>
                </Tag>
              </Td>
              <Td>USD 189.99</Td>
              <Td><Button colorScheme='yellow' size='md' rightIcon={<FaArrowRight />}> Send Invoice to Email </Button></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default BillingContainer
