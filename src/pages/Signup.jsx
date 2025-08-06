import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Camera, Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react'; // Make sure useState is imported
import { auth } from '../firebase';

const Signup = () => {
  // 1. ADD STATE for email, password, and any potential errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To show feedback to the user
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  // 2. MODIFY the signup handler to be attached to a form's onSubmit event
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents the page from reloading on form submission
    setError(''); // Clear previous errors

    // Basic validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Good practice: log the user object specifically
      console.log('Signed Up as:', userCredential.user);
      localStorage.setItem('token', userCredential.user.accessToken); // Store token if needed
      window.location.href = '/preUserInfoForm'; // Redirect to login after successful signup
      // You can redirect the user here, e.g., using useNavigate from react-router-dom
    } catch (err) {
      // Provide more specific error messages
      console.error('Error signing up:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already in use.');
      } else {
        setError('Failed to create an account. Please try again.');
      }
    }
  };

  return (
    <div className='bg-blue-950 w-screen h-screen flex items-center justify-center'>
      <div className='bg-white p-5 flex flex-col items-center justify-between min-w-[20%] rounded-2xl shadow shadow-white/80'>
        <div className='bg-blue-100 p-5 my-5'>
          <Camera size={40} />
        </div>
        <div className='flex flex-col items-center justify-between mb-10'>
          {/* Minor Fix: Changed text to be more appropriate for a sign-up page */}
          <h1 className='text-3xl font-bold'>Create an Account</h1>
          <p className='text-gray-500'>Join us by creating your account</p>
        </div>

        {/* 3. WRAP inputs in a <form> element and use onSubmit */}
        <form className='w-full' onSubmit={handleSignup}>
          <div className='flex flex-col justify-between w-full *:py-2 '>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder='john@gmail.com'
              className='p-2 border rounded-[10px]'
              // 4. CONNECT email input to state
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className='flex flex-col justify-between w-full relative *:py-2'>
              <label htmlFor="password" className='font-semibold'>Password</label>
              <input
                type={`${isOpen ? "text" : "password"}`}
                name="password"
                id="password"
                placeholder='Enter Your Password'
                className='p-2 border rounded-[10px]'
                // 5. CONNECT password input to state
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div onClick={toggleIsOpen} className='absolute bottom-2 right-3 cursor-pointer'>
                {isOpen ? <Eye /> : <EyeClosed />}
              </div>
            </div>
          </div>

          {/* 6. SHOW the error message to the user */}
          {error && <p className='text-red-500 text-sm my-2'>{error}</p>}

          {/* Minor Fix: Changed button text to "Sign Up" and type to "submit" */}
          <button type="submit" className='bg-primary w-full p-3 text-white text-lg rounded-2xl cursor-pointer my-5'>
            Sign Up
          </button>
        </form>

        {/* This seems to point to itself, maybe it should point to /login? */}
        <p>Already have an account? <a href="/signup" className='text-blue-800'>Sign In</a></p>
      </div>
    </div>
  );
};

export default Signup;