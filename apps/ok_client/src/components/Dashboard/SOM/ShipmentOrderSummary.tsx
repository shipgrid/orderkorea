import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'

type OrderSummaryItemProps = {
  label: string
  value?: string
  children?: React.ReactNode
}

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  )
}

export default function() {
  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="325px" bgColor={'white'}>
      <Heading size="md">Shipment Order Summary</Heading>
      <Stack spacing="6">
        <OrderSummaryItem label="Shipment-10162427-549a-43a8-b0e7">
          <Text fontWeight="medium">$597.99</Text>
        </OrderSummaryItem>
        <OrderSummaryItem label="Subtotal">
          <Text fontWeight="medium">$597.99</Text>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            $597.99
          </Text>
        </Flex>
      </Stack>
    </Stack>
  )
}