import React from 'react'
import MasterCard from "../MasterCard/MasterCard";
import { Outlet } from 'react-router-dom';


const ProfessorsCard = () => {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-[18px] h-[270px] overflow-hidden items-center'>
                   
                   <MasterCard />
                   <MasterCard />
                   <MasterCard />
                   <MasterCard />

               </div>
    
    </div>
  )
}

export default ProfessorsCard