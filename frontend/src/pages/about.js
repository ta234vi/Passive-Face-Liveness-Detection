import React from 'react';
import sahil from '../assets/sahil.png'
import akhil from '../assets/akhil.jpg'
import saksham from '../assets/saksham.webp'
import rishi from '../assets/rishi.jpg'
import muskan from '../assets/muskan.jpg'
import tanvi from '../assets/tanvi.png'
function About() {
  const developers = [
      { name: 'Sahil Garg', skill1:'UI/UX',skill2:'TensorFlow' ,skill3:"Data Analyst", image: sahil },
      { name: 'Saksham', skill1: 'Frontend Development', skill2:'Backend Development',skill3:'Machine Learning', image: saksham },
    { name: 'Akhil Rathour', skill1: 'TensorFlow', skill2:'Neural Networks', skill3:'Deep learning',image: akhil },
    { name: 'Muskan Mehta', skill1: 'TensorFlow', skill2:'FaceNet',skill3:'Neural Networks', image: muskan },
    { name: 'Tanvi Garg', skill1: 'TensorFlow', skill2:'Neural Networks', skill3:'Deep learning', image: tanvi },
    { name: 'Rishi Bindal', skill1:'UI/UX',skill2:'TensorFlow',skill3:"Data Analyst", image:rishi },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-100">
      <h1 className="text-5xl font-bold mb-8 text-center">About Our Website</h1>
      <p className="text-lg text-gray-700 mb-16 text-center max-w-3xl">
        Our website is dedicated to providing advanced face spoofing prevention services. 
        We use cutting-edge technology to ensure your identity is protected at all times. 
        Our team is composed of skilled professionals committed to creating a secure and user-friendly platform.
      </p>
      
      <h2 className="text-4xl font-semibold mb-8 text-center">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {developers.map((developer, index) => (
          <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            <img
              src={developer.image} 
              alt={`${developer.name}`} 
              className="w-40 aspect-auto h-40 rounded-full mb-4 object-cover" 
            />
            <h3 className="text-2xl font-bold mb-2">{developer.name}</h3>
            <p className="text-gray-600">{developer.skill1}</p>
            <p className="text-gray-600">{developer.skill2}</p>
            <p className="text-gray-600">{developer.skill3}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
