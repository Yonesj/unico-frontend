import React, { useState } from 'react';
import { Modal, Button, Card, Row, Col, Typography } from 'antd';
import { ReactComponent as Low } from "../../Assets/images/low.svg"
import { ReactComponent as Mid } from "../../Assets/images/mid.svg"
import { ReactComponent as High } from "../../Assets/images/high.svg"
import { ReactComponent as Super } from "../../Assets/images/super.svg"


const { Title, Text } = Typography;

const packages = [
  {
    icon: <Super style={{ fontSize: 32 }} />,
    title: 'بسته پیامکی 1 ماهه (۳۰ روز)',
    expire: 'تاریخ پایان بسته: ۱۴۰۴/۰۶/۲۵',
    price: '۶۸ هزار تومان',
  },
  {
    icon: <High style={{ fontSize: 32 }} />,
    title: 'بسته پیامکی 1 ماهه (۳۰ روز)',
    expire: 'تاریخ پایان بسته: ۱۴۰۴/۰۶/۲۵',
    price: '۶۸ هزار تومان',
  },
  {
    icon: <Mid style={{ fontSize: 32 }} />,
    title: 'بسته پیامکی 1 ماهه (۳۰ روز)',
    expire: 'تاریخ پایان بسته: ۱۴۰۴/۰۶/۲۵',
    price: '۶۸ هزار تومان',
  },
  {
    icon: <Low style={{ fontSize: 32 }} />,
    title: 'بسته پیامکی 1 ماهه (۳۰ روز)',
    expire: 'تاریخ پایان: ۱۴۰۴/۰۶/۲۵',
    price: '۶۸ هزار تومان',
  },
];

const SmsPackageModal = ({ onOk, onClose, open }) => {
  const [visible, setVisible] = useState(true);

  return (
    <Modal
    className='font-iransansfa'
      open={open}
      onCancel={onClose}
      title="خرید بسته پیامکی"
      footer={null}
      centered
      width={1008}
    >
      <div className='font-iransansfa'>
      <Row className=' cursor-default' gutter={[16, 16]} >
        {packages.map((pkg, index) => (
          <Col xs={12} sm={12} md={6} key={index}>
            <Card
              hoverable
              bordered={false}
              style={{ textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <div className=  ' flex  justify-center font-iransansfa' style={{ marginBottom: 12 , fontWeight: 700 , fontSize:"16px"   }}>{pkg.icon}</div>
              <Text strong>{pkg.title}</Text>
              <br />
              <Text className=' font-iransansfa' type="secondary" style={{ fontSize: 12 }}>{pkg.expire}</Text>
              <br />
              <Title className=' font-iransansfa'  style={{ margin: '12px 0', fontWeight: 300 , fontSize:"18px"  , color:"#000000" }}>{pkg.price}</Title>
              <div  className='w-full bg-[#00ADB5]  text-white py-[6px] px-[15px] rounded-[8px] font-iransansfa text-sm font-medium' >خرید</div>
            </Card>
          </Col>
        ))}
      </Row>
      </div>
    </Modal>
  );
};

export default SmsPackageModal;