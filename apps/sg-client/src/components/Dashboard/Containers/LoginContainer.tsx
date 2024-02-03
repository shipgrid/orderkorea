import { 
  Outlet 
} from "react-router-dom";

import {
  Suspense 
} from "react";

import { 
  Spinner 
} from '@chakra-ui/react'


const AccountContainer = () => {
  return (
    <>
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Outlet />
      </div>
      <Suspense fallback={
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      }>
      </Suspense>
    </>
  );
}

export default AccountContainer