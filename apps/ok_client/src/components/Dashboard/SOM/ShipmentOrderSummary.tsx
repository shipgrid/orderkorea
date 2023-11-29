import React from 'react';

import { 
  Collapse
 } from 'antd';

import { 
  IoReceiptOutline 
} from 'react-icons/io5';

type OrderSummaryItemProps = {
  label: string
  value?: string
  children?: React.ReactNode
}

const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children } = props
  return (
    <div style={{ justifyContent: 'space-between', display: 'flex', marginBottom: 15 }}>
      <p style={{ fontWeight: 'bold', color: 'gray' }}>
        {label}
      </p>
      {value ? <p style={{ fontWeight: 'bold' }}>{value}</p> : children}
    </div>
  )
}

const OrderSummary = () => {

  return (
    <div>
      <OrderSummaryItem
        label="Shipment-10162427-549a-43a8-b0e7"
        value="$40.99"
      />
      <OrderSummaryItem
        label="Extra Padding Fee"
        value="$2"
      />
      <OrderSummaryItem
        label="Gift Wrapping Fee"
        value="$10"
      />
      <OrderSummaryItem
        label="Picking Fee"
        value="$20"
      />
      <OrderSummaryItem
        label="Packing Fee"
        value="$2"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <p style={{ fontWeight: 'bold' }}>
          Total
        </p>
        <p style={{ fontWeight: 'bold' }}>
          $1597.99
        </p>
      </div>
    </div>
  )
}

const App: React.FC = () => (
  <>
    <Collapse
      style={{ width: '100%' }}
      size="large"
      items={[{ key: '1', label: 'Shipment Order Summary ', children: <OrderSummary/>, extra: <IoReceiptOutline /> }]}
    />
  </>
);

export default App;