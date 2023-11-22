import {
  Flex,
  Icon,
  Button,
} from '@chakra-ui/react';

import { 
  IoIosArrowBack,
  IoIosArrowForward 
} from 'react-icons/io';

interface PagButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
}

const PagButton: React.FC<PagButtonProps> = ({
  children,
  disabled,
  active,
}) => {
  const activeStyle = {
    bg: 'brand.600',
    _dark: {
      bg: 'brand.500',
    },
    color: 'lightblue',
  };

  return (
    <Button
      mx={1}
      px={4}
      py={2}
      rounded="md"
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
      color="gray.700"
      opacity={disabled ? 0.6 : undefined}
      _hover={!disabled ? activeStyle : {}}
      cursor={disabled ? 'not-allowed' : undefined}
      {...(active && activeStyle)}
    >
      {children}
    </Button>
  );
};

interface PaginationProps {
  // Add any props you need for your Pagination component here
}

const Pagination: React.FC<PaginationProps> = () => {
  return (
    <Flex
      bg="#edf3f8"
      _dark={{
        bg: '#3e3e3e',
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Flex>
        <PagButton>
          <Icon
            as={IoIosArrowBack}
            color="gray.700"
            _dark={{
              color: 'gray.200',
            }}
            boxSize={4}
          />
        </PagButton>
        <PagButton>1</PagButton>
        <PagButton active>2</PagButton>
        <PagButton>3</PagButton>
        <PagButton>4</PagButton>
        <PagButton>5</PagButton>
        <PagButton>
          <Icon
            as={IoIosArrowForward}
            color="gray.700"
            _dark={{
              color: 'gray.200',
            }}
            boxSize={4}
          />
        </PagButton>
      </Flex>
    </Flex>
  );
};

export default Pagination;
