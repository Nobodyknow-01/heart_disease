import React from 'react';
import { FaHeartPulse } from 'react-icons/fa6';

const HeartComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <FaHeartPulse size={100} color='red' />
    </div>
  );
};

export default HeartComponent;
