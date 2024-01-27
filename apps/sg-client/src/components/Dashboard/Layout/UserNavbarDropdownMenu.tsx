import {
  startTransition,
  useState,
  useEffect
} from 'react';

import { 
  Dropdown,
  Avatar
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
  useSelector
} from 'react-redux'

import { 
  useNavigate 
} from 'react-router-dom'

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
  const [isMobile, setIsMobile] = useState(false);
  const session = useSelector((state: any) => state.session);


  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const userDropdownItems: MenuProps['items'] = [];

  userDropdownItems.push(
    {
      key: '2',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/orders'))}>
          <CiViewList/> 
          <a
              href="https://forms.gle/qT2XmsD5CuXmWdKv6"
              target="_blank"
              rel="noopener noreferrer"
            >
            <span style={{ marginLeft: 5 }}> List a Car </span>
          </a>
        </div>
      ),
    })

  if(isMobile) {
    userDropdownItems.push(
      {
        key: '4',
        label: (
          <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/'))}>
            <IoCarSportSharp/> 
            <span style={{ marginLeft: 5 }}>  Broker Inventory </span>
          </div>
        ),
      })

    userDropdownItems.push(
      {
        key: 'my-orders',
        label: (
          <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/orders'))}>
            <CiViewList/> 
            <span style={{ marginLeft: 5 }}>  My Orders </span>
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
      <div>
      <Avatar style={{ backgroundColor: 'green', verticalAlign: 'middle', cursor: 'pointer' }} size="large">
        {session.username[0] + session.username[1] }
      </Avatar>        
      </div>
    </Dropdown>
  );
};

export default UserNavbarDropdownMenu
