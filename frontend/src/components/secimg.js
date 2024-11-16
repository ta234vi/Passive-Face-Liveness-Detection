import React from 'react';
import faceScan1 from '../assets/face-detection-4791810_640.jpg';
import faceScan2 from '../assets/logo.jpg';
import faceScan3 from '../assets/login.png';

function SectionImage() {
  return (
    <div className="face-scanning-section bg-gray-200 pt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Face Scanning in Action</h2>
        <div className="flex justify-center space-x-8"> {/* Flex container with space between images */}
          <div className='h-7/12'>
            <img
              src={faceScan1}
              alt="Face Scanning Step 1"
              className="w-9/12 h-auto object-cover rounded-lg"
            />
          </div>
          <div className='h-7/12'>
            <img
              src={faceScan2}
              alt="Face Scanning Step 2"
              className="w-9/12 h-auto object-cover rounded-lg"
            />
          </div>
          <div className='h-7/12'>
            <img
              src={faceScan3}
              alt="Face Scanning Step 3"
              className="w-9/12 h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionImage;
