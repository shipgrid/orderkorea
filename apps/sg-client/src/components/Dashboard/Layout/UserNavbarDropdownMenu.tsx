import {
  startTransition,
  useState,
  useEffect
} from 'react';

import { 
  Dropdown
} from 'antd';

import type { 
  MenuProps 
} from 'antd';

import { 
  RiLogoutBoxRLine,
} from "react-icons/ri";

import { 
  MdOutlineAdminPanelSettings 
} from "react-icons/md";

import {
  useDispatch,
} from 'react-redux'

import { 
  useNavigate 
} from 'react-router-dom'

import { 
  useSelector 
} from 'react-redux'

import { 
  MdOutlineAccountCircle 
} from "react-icons/md";

import { 
  IoCarSportSharp 
} from "react-icons/io5";

import { 
  CiViewList 
} from "react-icons/ci";

const UserNavbarDropdownMenu = ({ 
}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state: any) => state.session);

  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const userDropdownItems: MenuProps['items'] = [];

  if(isMobile) {
    userDropdownItems.push(
      {
        key: '4',
        label: (
          <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/'))}>
            <IoCarSportSharp/> 
            <span style={{ marginLeft: 5 }}>  Inventory </span>
          </div>
        ),
      })
  }

  if(session?.isStaff) {
    userDropdownItems.push(
      {
        key: '1',
        label: (
          <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('admin'))}>
            <MdOutlineAdminPanelSettings/> 
            <span style={{ marginLeft: 5 }}>  Admin </span>
          </div>
        ),
      })
  }

  userDropdownItems.push(
    {
      key: '2',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/orders'))}>
          <CiViewList/>
          <span style={{ marginLeft: 5 }}>  Orders </span>
        </div>
      ),
    })

  userDropdownItems.push(
    {
      key: '3',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={(e) => {
          e.stopPropagation; 
          dispatch({ type: 'LOGOUT' });
          }}
        >
          <RiLogoutBoxRLine/> 
          <span style={{ marginLeft: 5 }}>  Sign Out </span>
        </div>
      ),
    }
  )

  const menuProps = {
    items: userDropdownItems,
  };

  return (
    <Dropdown
      menu={menuProps}
      trigger={['click']}
      placement="bottomLeft"
      arrow
    >
      <div >
        <MdOutlineAccountCircle style={{ fontSize: 24, color: '#171a20', cursor: 'pointer' }}/>
      </div>
    </Dropdown>
  );
};

export default UserNavbarDropdownMenu
