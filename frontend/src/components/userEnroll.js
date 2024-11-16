import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Loader from './Loader';

function UserEnroll() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    aadhar: "",
    image: "",
    address: "",
    phoneNo: "",
    gender: "",
    dob: ""
  });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const inputsRef = useRef([]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required.";
    if (!formData.lastname) newErrors.lastname = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.aadhar) newErrors.aadhar = "Aadhar number is required.";
    if (formData.aadhar.length !== 12) newErrors.aadhar = "Aadhar number must be exactly 12 digits.";
    if (!formData.image) newErrors.image = "Image is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.phoneNo) newErrors.phoneNo = "Phone number is required.";
    if (formData.phoneNo.length !== 10) newErrors.phoneNo = "Phone number must be exactly 10 digits.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const changeHandler = (event) => {
    const { name, files, value, type } = event.target;

    if (type === 'file' && files.length > 0) {
      const file = files[0];
      const maxSizeMB = 2;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file.");
        return;
      }

      if (file.size > maxSizeBytes) {
        toast.error(`File size exceeds ${maxSizeMB}MB.`);
        return;
      }

      setFormData(prevData => ({
        ...prevData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  async function submitHandler(event) {
    event.preventDefault();
    
    if (!validate()) return;
  
    setLoading(true); // Start loading when beginning the submission process
  
    try {
      // Step 1: Upload the image
      const formDataForUpload = new FormData();
      formDataForUpload.append('file', formData.image);
  
      const uploadResponse = await fetch('http://localhost:3000/api/auth/upload', {
        method: 'POST',
        body: formDataForUpload,
      });
  
      if (!uploadResponse.ok) {
        throw new Error('Image upload failed');
      }
  
      const uploadResult = await uploadResponse.json();
  
      // Step 2: Submit user data
      const userData = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        aadhar: formData.aadhar,
        image: uploadResult.url,  // Use the URL returned from the server
        address: formData.address,
        phoneNo: formData.phoneNo,
        gender: formData.gender,
        dob: formData.dob
      };
  
      const userResponse = await fetch('http://localhost:3000/api/auth/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
  
      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.message || 'Failed to create account');
      }
  
      toast.success("Account Created Successfully");
      navigate("/home");
  
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error(error.message || "An error occurred while creating the account.");
    } finally {
      setLoading(false); // Stop loading after the process completes or fails
    }
  }
  

  useEffect(() => {
    gsap.from(formRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    });
    gsap.from(inputsRef.current, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    });
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
      {loading && <Loader />}
      <h2 className="text-3xl font-bold text-gray-800 text-center">Create User</h2>
      <form ref={formRef} onSubmit={submitHandler} encType='multipart/form-data' className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name<sup className='text-red-500'>*</sup></label>
            <input
              ref={(el) => inputsRef.current[0] = el}
              className={`mt-1 block w-full px-4 py-3 border ${errors.firstname ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500`}
              type="text"
              onChange={changeHandler}
              value={formData.firstname}
              name="firstname"
              placeholder="Enter First Name"
            />
            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name<sup className='text-red-500'>*</sup></label>
            <input
              ref={(el) => inputsRef.current[1] = el}
              className={`mt-1 block w-full px-4 py-3 border ${errors.lastname ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500`}
              type="text"
              onChange={changeHandler}
              value={formData.lastname}
              name="lastname"
              placeholder="Enter Last Name"
            />
            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address<sup className='text-red-500'>*</sup></label>
          <input
            ref={(el) => inputsRef.current[2] = el}
            className={`mt-1 block w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500`}
            type="email"
            onChange={changeHandler}
            value={formData.email}
            name="email"
            placeholder="Enter Email Address"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Aadhar Number<sup className='text-red-500'>*</sup></label>
          <input
            ref={(el) => inputsRef.current[3] = el}
            className={`mt-1 block w-full px-4 py-3 border ${errors.aadhar ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500`}
            type="text"
            onChange={changeHandler}
            value={formData.aadhar}
            name="aadhar"
            placeholder="Enter Aadhar Number"
          />
          {errors.aadhar && <p className="text-red-500 text-sm mt-1">{errors.aadhar}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image<sup className='text-red-500'>*</sup></label>
          <input
            ref={(el) => inputsRef.current[4] = el}
            className={`mt-1 block w-full px-4 py-3 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500`}
            type="file"
            onChange={changeHandler}
            accept="image/*"
            name="image"
          />
          {formData.image && (
            <div className="mt-4">
              <p className="text-gray-700">Image Preview:</p>
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="mt-2 max-w-full h-auto border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address<sup className='text-red-500'>*</sup></label>
          <input
            ref={(el) => inputsRef.current[5] = el}
            className={`mt-1 block w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500`}
            type="text"
            onChange={changeHandler}
            value={formData.address}
            name="address"
            placeholder="Enter Address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number<sup className='text-red-500'>*</sup></label>
          <input
            ref={(el) => inputsRef.current[6] = el}
            className={`mt-1 block w-full px-4 py-3 border ${errors.phoneNo ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500`}
            type="text"
            onChange={changeHandler}
            value={formData.phoneNo}
            name="phoneNo"
            placeholder="Enter Phone Number"
          />
          {errors.phoneNo && <p className="text-red-500 text-sm mt-1">{errors.phoneNo}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender<sup className='text-red-500'>*</sup></label>
          <select
            ref={(el) => inputsRef.current[7] = el}
            className={`mt-1 block w-full px-4 py-3 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500`}
            onChange={changeHandler}
            value={formData.gender}
            name="gender"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth<sup className='text-red-500'>*</sup></label>
          <input
            ref={(el) => inputsRef.current[8] = el}
            className={`mt-1 block w-full px-4 py-3 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500`}
            type="date"
            onChange={changeHandler}
            value={formData.dob}
            name="dob"
          />
          {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserEnroll;
