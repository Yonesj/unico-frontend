import React, { useState, useEffect } from 'react';
import GolestanLoginModal from '../Modal/GolestanLoginModal';
import Unit from '../../Pages/Unit/Unit';


const UnitWrapper = () => {
  const [hasAccess, setHasAccess] = useState(null);
  const handleOk = ()=>
{
    setGolestanModal(false);
    
}


const [golestanModal, setGolestanModal] = useState(true);

  useEffect(() => {
    const courses = localStorage.getItem('courses');
    setHasAccess(!!courses);
  }, []);

  if (hasAccess === null) return null;

  return hasAccess ? <Unit /> :   <GolestanLoginModal onOk={() => handleOk()} onClose={() =>setGolestanModal(false)} open={golestanModal} />;
};

export default UnitWrapper;
