import { 
  RxDotsVertical 
} from "react-icons/rx";

import type { MenuProps } from 'antd';

import {
  MdOutlineEdit,
  MdDeleteOutline 
} from "react-icons/md";

import { 
  GrFormView 
} from "react-icons/gr";

import {
  Dropdown,
  Menu
} from 'antd'

const items: MenuProps['items'] = [
  {
    label: 'View',
    key: '1',
    icon: <GrFormView />,
  },
  {
    label: 'Edit',
    key: '2',
    icon: <MdOutlineEdit />,
  },
  {
    label: 'Remove',
    key: '3',
    icon: <MdDeleteOutline />,
  }
];

const TableActionDropdown: React.FC = () => {

  return (
    <div
      style={{ cursor: 'pointer' }}
    >
      <Dropdown
        overlay={<Menu items={items} />}  
      >
        <RxDotsVertical style={{ fontSize: 20 }}/>
      </Dropdown>
    </div>

  );
}

export default TableActionDropdown
