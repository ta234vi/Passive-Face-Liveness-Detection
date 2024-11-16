import React, { useState, useEffect } from 'react';
import { FiRefreshCcw } from "react-icons/fi";

function Captcha({ setCaptchaValue }) {
    const [captcha, setCaptcha] = useState('');

    useEffect(() => {
        generateCaptcha();
    }, []);

    const generateCaptcha = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let captcha = '';
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptcha(captcha);
        setCaptchaValue(captcha); // Set the generated captcha in the parent component
    };

    return (
        <div className='flex justify-around w-1/3'>
            <p 
                className="text-lg font-bold border-2 p-1 rounded-md border-black select-none"
                style={{ userSelect: 'none' }} // Make the text non-selectable
            >
                {captcha}
            </p>
            <button onClick={generateCaptcha} className="text-sm text-blue-500">
                <FiRefreshCcw color='black'/>
            </button>
        </div>
    );
}

export default Captcha;
