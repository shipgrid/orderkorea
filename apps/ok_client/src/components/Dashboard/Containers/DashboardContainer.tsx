import { Outlet } from "react-router-dom";
import Sidebar from '../Layout/Sidebar'
import { Suspense } from "react";
import { Spinner } from '@chakra-ui/react'

const DashboardContainer = () => {
  return (
    <>
      <Sidebar 
        content={
          <Outlet />
        }
      />
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

export default DashboardContainer