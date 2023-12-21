import { 
  useState,
  useEffect
} from 'react';
import {
  Table,
  Progress
} from 'antd'

import '../../../assets/index.css'

import { 
  BsBoxes 
} from "react-icons/bs";
import { useGetOrdersQuery } from '../../../services/api';

const OrderTable = () => {
  const [orders, setOrders] = useState<any[]>([]); // Update type and initialize as empty array
  const { data, error, isLoading } = useGetOrdersQuery({ customer_id: 1 });

  console.log('data:', data)
  useEffect(() => {
    if (data) {
      setOrders(data); // Update state with fetched data
    }
  }, [data]);

  const rowClassName = () => {
    return 'fixed-height-row';
  };

  const renderProductUrl = (text: any) => {
    const url = text.length > 0 ? text[0].product_url : '';
    return url ? (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ color: 'blue', textDecoration: 'underline' }}
      >
        {url}
      </a>
    ) : 'N/A';
  
  };

  
  const renderInventoryStatus = (text, record) => {
    if (record.order_sku && record.order_sku.length > 0) {
      const { quantity, quantity_received } = record.order_sku[0];
      const percent = quantity ? (quantity_received / quantity) * 100 : 0;
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Progress percent={percent} size="small" />
        </div>
      );
    } else {
      return 'N/A';
    }
  };
  
  const renderReceivedOrdered = (text, record) => {
    if (record.order_sku && record.order_sku.length > 0) {
      const { quantity, quantity_received } = record.order_sku[0];
      return `${quantity_received || 0} / ${quantity || 0}`;
    } else {
      return 'N/A';
    }
  };
  
  const renderTotalCost = (_: any, record: any) => {
    // Check if both quantity and unit_price are available
    if (record.order_sku && record.order_sku.length > 0 && record.skus && record.skus.length > 0) {
      const quantity = record.order_sku[0].quantity;
      const unitPrice = record.skus[0].unit_price;
  
      // Calculate total cost
      const totalCost = quantity * unitPrice;
      return totalCost.toFixed(2); // Formats the cost to 2 decimal places
    } else {
      return 'N/A'; // Return 'N/A' if the necessary data is missing
    }
  };
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'URL',
      dataIndex: 'skus',
      key: 'product_url',
      render: renderProductUrl, // Use the custom render function here
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
    },
    {
      title: 'Created',
      dataIndex: 'created_on',
      key: 'created_on',
    },
    // {
    //   title: 'Expected',
    //   dataIndex: 'expected',
    //   key: 'expected',
    // },
    {
      title: 'Inventory Status',
      dataIndex: 'order_sku',
      key: 'inventoryStatus',
      render: renderInventoryStatus,
    },
    {
      title: 'Inventory Received',
      dataIndex: 'order_sku',
      key: 'receivedOrdered',
      render: renderReceivedOrdered,
    },
    {
      title: 'Total Cost',
      render: renderTotalCost, // Use the custom render function here
    },
  ];

  return (
    <Table 
      dataSource={orders} 
      columns={columns} 
      size='small'
      bordered
      rowClassName={rowClassName}
    />
  );
}

export default OrderTable
