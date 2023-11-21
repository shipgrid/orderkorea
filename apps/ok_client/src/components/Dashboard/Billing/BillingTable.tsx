import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
  Button,
  TagLabel,
} from '@chakra-ui/react';

import { 
  FaArrowRight 
} from "react-icons/fa";

const BillingTable = () => {
  return (
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
  );
}

export default BillingTable
