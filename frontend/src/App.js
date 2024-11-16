import './App.css';
import Navbar from './components/navbar';
import {Routes,Route, Navigate} from "react-router-dom" 
import Home from './pages/home';
import Loginform from './components/loginform'
import {useState} from 'react'
import About from './pages/about';
import Contact from './pages/contact';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import VerificationSuccess from './components/success';
import VerificationFailure from './components/failure';
function App() {
  const [isLoggedIn,setisLoggedIn]=useState(false)
  const [userRole, setUserRole] = useState(null);
  return (
    <div className={`${"App w-screen bg-white min-h-screen"  }`}>
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} setisLoggedIn={setisLoggedIn}></Navbar>
      <Routes>
        <Route>
          <Route path='/' element={<Home isLoggedIn={isLoggedIn} userRole={userRole}/>}></Route>
          <Route path="/login" element={<Loginform setisLoggedIn={setisLoggedIn} setUserRole={setUserRole} />} />
            {isLoggedIn && userRole === "Admin" && (
                <Route path="/admin/dashboard" element={<AdminDashboard/>} />
            )}
            {isLoggedIn && userRole === "User" && (
                <Route path="/user/authenticate" element={<UserDashboard />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path="/verification-success" element={<VerificationSuccess />} />
        <Route path="/verification-failure" element={<VerificationFailure />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
