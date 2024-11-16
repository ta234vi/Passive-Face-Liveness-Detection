import imgg from "../assets/face-detection-4791810_640.jpg";
import Loginform from "./loginform";
import { useEffect } from 'react';
import gsap from 'gsap';

function Template({ title, desc1, desc2, setisLoggedIn }) {
    useEffect(() => {
        gsap.from(".login-text", {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power2.out'
        });
        gsap.from(".login-form", {
            opacity: 0,
            y: 30,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.3
        });
        gsap.from(".hero-image", {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: 'power2.out',
            delay: 0.5
        });
    }, []);

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center w-11/12 max-w-[1160px] py-12 mx-auto gap-x-20 gap-y-12 lg:gap-y-0 bg-gray-100 min-h-screen">
            <div className="flex flex-col items-center lg:items-start lg:w-1/2 hero-text">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 login-text">
                    {title}
                </h1>
                <p className="text-lg text-gray-600 mb-6 login-text">
                    {desc1}
                </p>
                <p className="text-lg text-gray-600 mb-6 login-text">
                    {desc2}
                </p>
                <img
                    src={imgg}
                    alt="Face Detection"
                    className="w-full h-auto rounded-lg shadow-lg hero-image"
                />
            </div>
            <div className="lg:w-1/2 flex justify-center items-center login-form">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                    <Loginform setisLoggedIn={setisLoggedIn} />
                </div>
            </div>
        </div>
    );
}

export default Template;
