import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './home.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Footer from '../components/footer';
import SectionImage from '../components/secimg';
import { useNavigate } from 'react-router-dom';
function HomePage({isLoggedin,userRole}) {
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const howItWorksRef = useRef(null);
    const faceScanningRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(heroRef.current, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" });
        gsap.fromTo(featuresRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", scrollTrigger: { trigger: featuresRef.current, start: "top 75%", end: "bottom 25%", scrub: true } });
        gsap.fromTo(howItWorksRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", scrollTrigger: { trigger: howItWorksRef.current, start: "top 75%", end: "bottom 25%", scrub: true } });
        gsap.fromTo(faceScanningRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power4.out", scrollTrigger: { trigger: faceScanningRef.current, start: "top 75%", end: "bottom 25%", scrub: true } });
        gsap.fromTo(footerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" });
    }, []);
    const Navigate=useNavigate()
    function btnHandler(){
    if(!isLoggedin){
        Navigate('/login')
    }
    else{
       userRole==="Admin" ?Navigate('/admin/dasboard') : Navigate("/user/authenticate")

    }
}
    return (
        <div className="homepage">
            {/* Hero Section */}
            <section ref={heroRef} className="hero-section bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white flex flex-col items-center justify-center h-screen text-center relative">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className="text-5xl font-bold mb-4 relative z-10">Welcome to SecurityScan</h1>
                <p className="text-lg mb-8 relative z-10">Your trusted solution for face recognition and anti-spoofing technology.</p>
                <button onClick={btnHandler} className="cta-button relative z-10 bg-white text-blue-500 py-3 px-6 rounded-full text-lg">Get Started</button>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="features-section bg-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="feature-item bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                            <AiOutlineCheckCircle className="text-blue-500 text-4xl mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Real-time Detection</h3>
                            <p>Our system detects faces in real-time with high accuracy.</p>
                        </div>
                        <div className="feature-item bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                            <AiOutlineCheckCircle className="text-blue-500 text-4xl mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Anti-Spoofing</h3>
                            <p>Advanced algorithms prevent spoofing attacks.</p>
                        </div>
                        <div className="feature-item bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                            <AiOutlineCheckCircle className="text-blue-500 text-4xl mb-4" />
                            <h3 className="text-xl font-semibold mb-2">High Security</h3>
                            <p>Ensuring the highest level of security for your applications.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section ref={howItWorksRef} className="how-it-works-section bg-white py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                    <div className="flex flex-col md:flex-row justify-center gap-8">
                        <div className="step bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                            <h3 className="text-2xl font-semibold mb-4">Step 1</h3>
                            <p>Upload your image or video for analysis.</p>
                        </div>
                        <div className="step bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                            <h3 className="text-2xl font-semibold mb-4">Step 2</h3>
                            <p>Our system processes and analyzes the data.</p>
                        </div>
                        <div className="step bg-blue-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                            <h3 className="text-2xl font-semibold mb-4">Step 3</h3>
                            <p>Receive detailed results and insights.</p>
                        </div>
                    </div>
                </div>
            </section>
            <SectionImage ref={faceScanningRef}></SectionImage>
            <Footer ref={footerRef}></Footer>
        </div>
    );
}

export default HomePage;
