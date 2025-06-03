import { useEffect } from "react";
import  UnitHeader  from "../../Components/UnitHeader/UnitHeader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Unit = () => {
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/unit") {
      nav("schedule"); 
    }
  }, [location, nav]);


  return (
    <div className="bg-[#F1F5F7]  px-4 font-iransansfa relative h-screen overflow-y-scroll">
      {/* <Sidebar /> */}
      <UnitHeader />
      <Outlet />
    </div>
  );
};

export default Unit;
