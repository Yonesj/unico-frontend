import { Menu } from "antd"
import Sidebar, { SidebarItem } from "../../Components/Sidebar/Sidebar"
import unitSvg from "../../Assets/images/unit.svg"
import AddUnitModal from "../../Components/Modal/AddUnitModal"
import { useState } from "react"
import GolestanLoginModal from "../../Components/Modal/GolestanLoginModal"
import Exams from "../exams"
import Schedules from "../schedules"
import UnitHeader from "../../Components/UnitHeader/UnitHeader"
import { Outlet, useOutlet } from "react-router-dom"
const Unit = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  


  return (
    <div className="bg-[#F1F5F7] h-full px-4 font-iransansfa relative">
      {/* <Sidebar /> */}
      <UnitHeader/>
      <AddUnitModal onOk={() => handleOk()} onClose={() => handleCancel()} open={isModalOpen} />
      <Outlet/>
    </div>
  )
}

export default Unit;