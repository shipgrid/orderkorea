import { 
  Outlet,
} from "react-router-dom";

import DashboardLayout from "./Layout/Layout";

const DashboardContainer = () => {

  return (
    <>
      <DashboardLayout 
        content={
          <Outlet />
        }
      />
    </>
  );
}

export default DashboardContainer