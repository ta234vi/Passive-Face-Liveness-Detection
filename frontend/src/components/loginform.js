import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from './Loader';
import Captcha from './captcha';
import { AadharInput } from './aadarInput';
import { CaptchaInput } from './captchaInput';
import { OtpInput } from './otpInput';
import useAnimations from './useAnimation';
import UserIcon from './userIcon';
import { UserContext } from '../context/usercontext';
import SectionImage from './secimg';
export function Loginform({ setisLoggedIn, setUserRole }) {
    const formRef = useRef(null);
    const headerRef = useRef(null);
    const AadharInputRef = useRef(null);
    const captchaInputRef = useRef(null);
    const otpInputRef = useRef(null);
    const [accountType, setaccountType] = useState("User");
    const navigate = useNavigate();
    const [formData, setformData] = useState({
        Aadhar: "", captcha: "", otp: ""
    });
    const [generatedCaptcha, setGeneratedCaptcha] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false); // State for loader
    const { setUserImageUrl } = useContext(UserContext);

    useAnimations({
        headerRef,
        formRef,
        AadharInputRef,
        captchaInputRef
    });

    useEffect(() => {
        console.log("Current account type:", accountType);
    }, [accountType]);

    function changeHandler(event) {
        const { name, value } = event.target;
        if (name === "Aadhar") {
            const formattedValue = value.replace(/\D/g, "");
            if (formattedValue.length <= 12) {
                setformData((prevData) => ({
                    ...prevData,
                    [name]: formattedValue
                }));
            }
        } else {
            setformData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    }
    function getFileNameFromPath(filePath) {
        // Normalize the file path to handle both forward slashes and backslashes
        const normalizedPath = filePath.replace(/\\/g, '/');
        // Extract the file name from the normalized path
        return normalizedPath.substring(normalizedPath.lastIndexOf('/') + 1);
    }    
    async function sendOtpHandler(event) {
        event.preventDefault();
        if (formData.Aadhar.length !== 12) {
            toast.error("Aadhar number must be exactly 12 digits.");
            return;
        }
        if (formData.captcha === generatedCaptcha) {
            setLoading(true); // Show loader
            try {
                const response = await fetch('http://localhost:3000/api/auth/generateOtp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ aadhar: formData.Aadhar })
                });

                const data = await response.json();
                
                if (response.ok) {
                    toast.success("OTP sent successfully");
                    setOtpSent(true);
                } else {
                    toast.error(data.msg);
                }
            } catch (err) {
                toast.error("Failed to send OTP. Please try again.");
            } finally {
                setLoading(false); // Hide loader
            }
        } else {
            toast.error("Captcha is incorrect");
        }
    }

    async function verifyOtpHandler(event) {
        event.preventDefault();
        if (formData.otp.length !== 6) {
            toast.error("OTP must be exactly 6 digits.");
            return;
        }
        
        setLoading(true); // Show loader
        try {
            const response = await fetch('http://localhost:3000/api/auth/verifyOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ aadhar: formData.Aadhar, otp: formData.otp })
            });

            const data = await response.json();
            if (response.ok) {
                if (data.role !== accountType) {
                    toast.error("Account type does not match.");
                    return;
                }
                
                toast.success("OTP verified successfully");
                const fileName = getFileNameFromPath(data.image);
                // Set user image URL from the response
                const filen="http://localhost:3000/images/uploads/"+fileName;
                console.log(filen)
                setUserImageUrl(filen)
                setisLoggedIn(true);
                setUserRole(data.role);
                if (data.role === "Admin") {
                    navigate("/");
                } else {
                    navigate("/");
                }
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Failed to verify OTP. Please try again.");
        } finally {
            setLoading(false); // Hide loader
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-min bg-gray-100 p-6 px-4 sm:px-6 lg:px-8">
            {loading && <Loader />} {/* Show loader if loading */}
            <div ref={headerRef} className="flex items-center justify-center bg-red-500 p-2 rounded-full my-6 gap-x-2 max-w-max shadow-lg">
                <button
                    className={`${accountType === "User" ? "bg-white text-black" : "bg-red-500 text-white"} py-2 px-6 rounded-full transition-all duration-200 font-semibold focus:outline-none hover:shadow-lg`}
                    onClick={() => setaccountType("User")}
                >
                    User
                </button>
                <button
                    className={`${accountType === "Admin" ? "bg-white text-black" : "bg-red-500 text-white"} py-2 px-6 rounded-full transition-all duration-200 font-semibold focus:outline-none hover:shadow-lg`}
                    onClick={() => setaccountType("Admin")}
                >
                    Admin
                </button>
            </div>
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Verify Your Aadhar</h2>
                <form ref={formRef} onSubmit={otpSent ? verifyOtpHandler : sendOtpHandler} className="space-y-6">
                    <AadharInput aadhar={formData.Aadhar} onChange={changeHandler} />
                    {!otpSent && (
                        <>
                            <CaptchaInput captcha={formData.captcha} onChange={changeHandler} setGeneratedCaptcha={setGeneratedCaptcha} />
                            <div>
                                <button
                                    type="submit"
                                    className="form-button w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Send OTP
                                </button>
                            </div>
                        </>
                    )}
                    {otpSent && (
                        <>
                            <OtpInput otp={formData.otp} onChange={changeHandler} />
                            <div>
                                <button
                                    type="submit"
                                    className="form-button w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </div>
           
        </div>
    );
}

export default Loginform;
