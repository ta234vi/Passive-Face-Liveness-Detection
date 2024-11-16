import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import toast from "react-hot-toast";
import { useState, useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { HiMenu, HiX } from "react-icons/hi";
import { UserContext } from "../context/usercontext";
function Navbar({ isLoggedIn, setisLoggedIn,userRole}) {
  const { userImageUrl } = useContext(UserContext);
  // console.log(userImageUrl)
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoRef = useRef(null);
  const navLinksRef = useRef([]);
  const buttonsRef = useRef([]);
  const userIconRef = useRef(null);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    gsap.from(logoRef.current, { opacity: 0, y: -20, duration: 1, ease: "power4.out" });
    gsap.from(navLinksRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.2,
      delay: 0.5,
      ease: "power4.out"
    });
    gsap.from(buttonsRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.6,
      stagger: 0.2,
      delay: 1,
      ease: "power4.out"
    });
    gsap.from(userIconRef.current, { opacity: 0, y: -20, duration: 1.2, delay: 1.5, ease: "power4.out" });
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setisLoggedIn(false);
      toast.success("Logged Out Successfully");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center w-full max-w-[1160px] py-4 mx-auto relative">
      {/* Mobile Menu Button */}
      <button className="lg:hidden text-2xl absolute left-4 top-4 z-50" onClick={handleMobileMenuToggle}>
        {isMobileMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Logo */}
      <Link to="/" ref={logoRef} className="flex-shrink-0">
        <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
      </Link>

      {/* Desktop Menu */}
      <nav className="hidden lg:flex flex-grow justify-between items-center gap-8">
        <ul className="text-black flex gap-x-8 text-xl mx-auto">
          <li
            ref={(el) => (navLinksRef.current[0] = el)}
            className={`${activeLink === "/" ? "border-b-4 border-black" : "border-b-0 border-transparent"}`}
          >
            <Link to="/" onClick={() => setActiveLink("/")}>Home</Link>
          </li>
          <li
            ref={(el) => (navLinksRef.current[1] = el)}
            className={`${activeLink === "/about" ? "border-b-4 border-black" : "border-b-0 border-transparent"}`}
          >
            <Link to="/about" onClick={() => setActiveLink("/about")}>About</Link>
          </li>
          <li
            ref={(el) => (navLinksRef.current[2] = el)}
            className={`${activeLink === "/contact" ? "border-b-4 border-black" : "border-b-0 border-transparent"}`}
          >
            <Link to="/contact" onClick={() => setActiveLink("/contact")}>Contact</Link>
          </li>
        </ul>
        <div className="flex items-center gap-6">
          {!isLoggedIn && (
            <Link to="/login">
              <button
                ref={(el) => (buttonsRef.current[0] = el)}
                className="bg-[#141A23] text-gray-300 py-2 px-4 rounded border border-[#212832]"
              >
                Log in
              </button>
            </Link>
          )}
          {isLoggedIn && (
            <>
              <Link to="/">
                <button
                  ref={(el) => (buttonsRef.current[1] = el)}
                  className="bg-[#141A23] text-gray-300 py-2 px-4 rounded border border-[#212832]"
                  onClick={handleLogout}
                >
                  LogOut
                </button>
              </Link>
             {userRole==="Admin" && <Link to="/admin/dashboard">
                <button
                  ref={(el) => (buttonsRef.current[2] = el)}
                  className="bg-[#141A23] text-gray-300 py-2 px-4 rounded border border-[#212832]"
                >
                  Add User
                </button>
              </Link>
            }
            {userRole==="User" && <Link to="/user/authenticate">
                <button
                  ref={(el) => (buttonsRef.current[2] = el)}
                  className="bg-[#141A23] text-gray-300 py-2 px-4 rounded border border-[#212832]"
                >
                  Authenticate
                </button>
              </Link>
            }
            </>
          )}
          <div ref={userIconRef} className="text-3xl text-gray-600">
            {isLoggedIn ? (
              <img src={userImageUrl} alt="User" className=" w-12 h-12 aspect-w-1 object-cover aspect-h-1 rounded-full" />
            ) : (
              <FaUserCircle />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-0 left-0 w-[60%] bg-white shadow-lg height-5/12 transform transition-transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} z-40`}>
        <nav className="flex flex-col items-center py-6 space-y-6">
          <ul className="text-black text-xl space-y-1">
            <li className={`${activeLink === "/" ? "border-b-4 border-black" : "border-b-0 border-transparent"}`}>
              <Link to="/" onClick={() => { setActiveLink("/"); handleMobileMenuToggle(); }}>Home</Link>
            </li>
            <li className={`${activeLink === "/about" ? "border-b-4 border-black" : "border-b-0 border-transparent"}`}>
              <Link to="/about" onClick={() => { setActiveLink("/about"); handleMobileMenuToggle(); }}>About</Link>
            </li>
            <li className={`${activeLink === "/contact" ? "border-b-4 border-black" : "border-b-0 border-transparent"}`}>
              <Link to="/contact" onClick={() => { setActiveLink("/contact"); handleMobileMenuToggle(); }}>Contact</Link>
            </li>
          </ul>
          <div className="flex flex-col gap-2">
            {!isLoggedIn && (
              <Link to="/login">
                <button
                  ref={(el) => (buttonsRef.current[0] = el)}
                  className="bg-[#141A23] w-20 text-gray-300 py-2 px-4 rounded border border-[#212832]"
                  onClick={handleMobileMenuToggle}
                >
                  Log in
                </button>
              </Link>
            )}
            {isLoggedIn && (
              <>
                <Link to="/">
                  <button
                    ref={(el) => (buttonsRef.current[1] = el)}
                    className="bg-[#141A23] w-20 text-gray-300 py-2 px-4 rounded border border-[#212832]"
                    onClick={() => {
                      handleLogout();
                      handleMobileMenuToggle();
                    }}
                  >
                    LogOut
                  </button>
                </Link>
                <Link to="/dashboard">
                  <button
                    ref={(el) => (buttonsRef.current[2] = el)}
                    className="bg-[#141A23] text-gray-300 py-2 px-4 rounded border border-[#212832]"
                    onClick={handleMobileMenuToggle}
                  >
                    Dashboard
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="text-4xl text-gray-600 mt-6">
            {isLoggedIn ? (
              <img src={userImageUrl} alt="User" className="w-12 h-12 rounded-full" />
            ) : (
              <FaUserCircle />
            )}
          </div>
          <Link to="/" ref={logoRef} className="flex-shrink-0">
        <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
      </Link>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
