// useAnimations.js
import { useEffect } from 'react';
import gsap from 'gsap';

const useAnimations = (refs) => {
    useEffect(() => {
        const { headerRef, formRef, AadharInputRef, captchaInputRef } = refs;

        gsap.from(headerRef.current, {
            opacity: 0,
            y: -30,
            duration: 1.5,
            ease: "power4.out"
        });

        gsap.fromTo(formRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0,
                duration: 1.5,
                delay: 0.5,
                ease: "power4.out"
            }
        );

        gsap.from(AadharInputRef.current, {
            opacity: 0,
            y: 20,
            duration: 1.2,
            delay: 0.5,
            ease: "power4.out"
        });

        gsap.from(captchaInputRef.current, {
            opacity: 0,
            y: 20,
            duration: 1.2,
            delay: 0.7,
            ease: "power4.out"
        });

        gsap.fromTo(".form-button",
            { scale: 1 },
            { scale: 1.1,
                duration: 0.3,
                repeat: 2,
                yoyo: true,
                ease: "power1.inOut"
            }
        );
    }, []);
};

export default useAnimations;
