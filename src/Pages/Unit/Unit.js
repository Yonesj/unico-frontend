import { Menu } from "antd"
import Sidebar, { SidebarItem } from "../../Components/Sidebar/Sidebar"
import unitSvg from "../../Assets/images/unit.svg"
import AddUnitModal from "../../Components/Modal/AddUnitModal"
import { useState } from "react"

const Unit = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Sidebar />
      <AddUnitModal onOk={() => handleOk()} onCansel={() => handleCancel} open={isModalOpen} />
    </div>
  )
}

export default Unit