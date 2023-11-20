import {
  Button,
  Heading,
  Card,
  Divider,
  ButtonGroup,
  Box,
  CardHeader,
  Tag,
  Flex,
  HStack,
  Stack,
  TagCloseButton,
  StepStatus,
  StepIcon,
  useSteps,
  StepIndicator,
  Stepper,
  StepSeparator,
  StepTitle,
  StepDescription,
  Step,
  StepNumber,
  Text,
  Radio
} from '@chakra-ui/react';

import { FiCheck } from "react-icons/fi";

import {
  useState,
  useEffect,
} from 'react'

import ShipmentInventoryRow from './ShipmentInventoryRow';
import PackingInstructionsDrawer from '../../Drawer/PackingInstructionsDrawer';
import ShipmentRateDrawer from '../../Drawer/ShipmentRateDrawer';

interface ShipmentInventoryRow {
  id: number,
}

interface ShipmentProps {
  shipmentInventoryRows?: ShipmentInventoryRow[];
}

const Shipment = ({
  shipmentInventoryRows
}:ShipmentProps) => {

  const [borderColor, setBorderColor] = useState('lightblue')  

  useEffect(() =>{

  }, [shipmentInventoryRows?.length])

  return (
    <>
      <Card
        direction={{ base: 'column' }}
        variant='outline'
        maxW={{ base: '700px' }}
        minW={{ base: '700px' }}
        backgroundColor={'none'}
        style={{ 
          borderStyle: 'dotted',
          borderWidth: '4px',
          borderColor: borderColor,
          cursor: 'pointer', 
          display: shipmentInventoryRows?.length ? 'block' : 'none' 
        }}
      >
        
      <Flex justifyContent={'space-between'}>
        <HStack py={1} px={3}>
          <Heading size='md' color='black'>
            Shipment 
          </Heading>
          <Text size='xs' color='darkgray'> (10162427) </Text>  
        </HStack>
        <HStack p={3} spacing={2}>
          <Button colorScheme='green' size='sm' isDisabled> Add Shipment </Button>
        </HStack>
      </Flex>
      <HStack py={1} px={2}>
        <Tag size='sm' colorScheme='orange' borderRadius='full'>
          Total Weight: 1.6kg
        </Tag>
      </HStack>
      <CardHeader flexDirection={'row-reverse'} p={2}>
        <ButtonGroup>
          <ShipmentRateDrawer 
            title='Choose Shipping Option'
            color='purple'
          />
          <PackingInstructionsDrawer 
            title='Packing Instructions (Optional)'
            color='yellow'
          />
        </ButtonGroup>
        <HStack spacing={2} pt={3} wrap='wrap'>
          <Tag size='sm' colorScheme='purple' borderRadius='full'>
            UPS - International Standard - $49.94
            <TagCloseButton />
          </Tag>
          {/* <Tag size='sm' colorScheme='red' borderRadius='full'>
            Inclusions Only
            <TagCloseButton />
          </Tag>
          <Tag size='sm' colorScheme='red' borderRadius='full'>
            Extra Padding
            <TagCloseButton />
          </Tag> */}
          <Tag size='sm' colorScheme='red' borderRadius='full'>
            Bubble Wrap
            <TagCloseButton />
          </Tag>
          <Tag size='sm' colorScheme='red' borderRadius='full'>
            Extra Instructions Provided
            <TagCloseButton />
          </Tag>
        </HStack>
        <Divider py={1} px={2}/>
      </CardHeader>
      {shipmentInventoryRows && shipmentInventoryRows.map((row) => (
        <div key={row.id}>
          <ShipmentInventoryRow
            id={row.id}
          />        
        </div>
      ))}
      </Card>
    </>
  );
}

export default Shipment