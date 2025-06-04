import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {ReactComponent as Image} from "../../Assets/images/image.svg"
import {ReactComponent as Download} from "../../Assets/images/file-download-1.svg"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { Modal } from "antd";
const programOptions = [
  { value: '1', label: 'برنامه ۱' },
  { value: '2', label: 'برنامه ۲' },
  { value: '3', label: 'برنامه ۳' },
  { value: '4', label: 'برنامه ۴' },
  { value: '5', label: 'برنامه ۵' },
];

const animatedComponents = makeAnimated();

const SaveCourseList =  ({ open, onOk, onClose }) => {
  const [selectedList, setSelectedList] = useState('');
  const contentRef = useRef(null);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const handleImageSave = async () => {
    const canvas = await html2canvas(contentRef.current);
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'course-list.png';
    link.href = imgData;
    link.click();
  };

  const handlePdfSave = async () => {
    const canvas = await html2canvas(contentRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('course-list.pdf');
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 48,
      borderRadius: 8,
      borderColor: '#ccc',
      boxShadow: 'none',
      direction: 'rtl',
    }),
    menu: (base) => ({
      ...base,
      zIndex: 1,
      marginTop: 4,
      maxHeight: 300, 
      overflowY: 'auto',
      animation: 'fadeIn 0.3s ease-in-out',
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#e0f7fa',
      direction: 'rtl',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#00796b',
      padding: '2px 6px',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#00796b',
      ':hover': {
        backgroundColor: '#b2dfdb',
        color: '#004d40',
      },
    }),
  };
  
  const fadeInStyle = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scaleY(0.95); }
    to { opacity: 1; transform: scaleY(1); }
  }
  `;

  return (
    <Modal
    className="font-iransans w-[400px] "
    open={open}
    onCancel={onClose}
    footer={null}
  >
    <div className="p-4 w-[450px] bg-white shadow-md rounded-xl text-right" ref={contentRef}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">ذخیره لیست کد دروس</h2>
       
      </div>
      <Select
        options={programOptions}
        isMulti
        components={animatedComponents}
        closeMenuOnSelect={false}
        value={selectedPrograms}
        onChange={(selected) => setSelectedPrograms(selected)}
        placeholder="برنامه مورد نظر را انتخاب کنید"
        className="mb-4 text-right"
        classNamePrefix="react-select"
        styles={customStyles}
      />

      <button
        onClick={handleImageSave}
        className="w-full transition-all bg-cyan-500 text-white py-2 rounded-lg mb-2 hover:bg-cyan-600 flex gap-2  justify-center font-iransans"
      >
        
      <Image />
         <div>
         ذخیره لیست به صورت تصویر
          </div> 
      </button>
      <button
        onClick={handlePdfSave}
        className="w-full transition-all  bg-cyan-500 text-white py-2 rounded-lg mb-2 hover:bg-cyan-600 flex gap-2  justify-center font-iransans"
      >
        
      <Download color='white'  />
         <div>
         ذخیره لیست به صورت PDF
          </div> 
      </button>
    </div>
    </Modal>
  );
};

export default SaveCourseList;
