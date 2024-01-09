import {
  startTransition,
  useState,
  useEffect
} from 'react';

import { 
  Button,
  Dropdown
} from 'antd';

import type { 
  MenuProps 
} from 'antd';

import {
  FiChevronDown,
} from 'react-icons/fi'

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
  useFirebase 
} from 'react-redux-firebase'

import { 
  useSelector 
} from 'react-redux'

import { 
  FaWpforms 
} from "react-icons/fa";

import { 
  MdOutlineAccountCircle 
} from "react-icons/md";

import { 
  IoCarSportSharp 
} from "react-icons/io5";

const UserNavbarDropdownMenu = ({ 
}) => {

  const navigate = useNavigate();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const session = useSelector((state: any) => state.session);

  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    }

    // Initial check and add event listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
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

  userDropdownItems.push(
    {
      key: '2',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={(_) => startTransition(() => navigate('/orders'))}>
          <FaWpforms/> 
          <span style={{ marginLeft: 5 }}>  My Orders </span>
        </div>
      ),
    }
  )

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
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={(e) => {e.stopPropagation; firebase.logout(); dispatch({ type: 'LOGOUT' });}}>
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
      {
        isMobile ? <MdOutlineAccountCircle style={{ fontSize: 36, marginRight: 10, color: 'white' }}/> : <Button icon={<FiChevronDown/>} style={{ marginRight: 10 }}> { session?.username } </Button>
      }
    </Dropdown>
  );
};

export default UserNavbarDropdownMenu
