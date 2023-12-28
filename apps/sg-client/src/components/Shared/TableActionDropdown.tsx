import { 
  RxDotsVertical 
} from "react-icons/rx";

import { 
  AiOutlineSelect 
} from "react-icons/ai";

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

interface TableActionDropdownMenuItemProps {
  label: string;
  action: () => void;
}

interface TableActionDropdownProps {
  actions: TableActionDropdownMenuItemProps[]
}

const TableActionDropdown: React.FC<TableActionDropdownProps> = ({
  actions=[]
}) => {

  const items = actions.map((action, index) => {

    if(!action.label) return null

    if(action.label.toLowerCase() === 'select') return ({
      label: action.label,
      key: `${index}`,
      icon: <AiOutlineSelect style={{ fontSize: 20 }}/>,
      onClick: action.action
    })

    if(action.label.toLowerCase() === 'edit') return ({
      label: action.label,
      key: `${index}`,
      icon: <MdOutlineEdit style={{ fontSize: 20 }}/>,
      onClick: action.action
    })

    if(action.label.toLowerCase()  === 'view') return ({
      label: action.label,
      key: `${index}`,
      icon: <GrFormView style={{ fontSize: 20 }}/>,
      onClick: action.action
    })

    if(action.label.toLowerCase()  === 'remove') return ({
      label: action.label,
      key: `${index}`,
      icon: <MdDeleteOutline style={{ fontSize: 20 }}/>,
      onClick: action.action
    })

    return {
      label: action.label,
      key: `${index}`,
      onClick: action.action
    }
  })

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
