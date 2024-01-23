import { 
  Outlet,
} from "react-router-dom";

import {
  Suspense 
} from "react";

import AuthLoader from "../Shared/AuthLoader";
import DashboardLayout from "./Layout/Layout";

const DashboardContainer = () => {

  return (
    <>
      <DashboardLayout 
        content={
          <Outlet />
        }
      />
      <Suspense fallback={
        <AuthLoader/>
      }>
      </Suspense>
    </>
  );
}

export default DashboardContainer