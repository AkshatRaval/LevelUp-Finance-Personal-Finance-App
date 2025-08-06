import { signInWithEmailAndPassword } from 'firebase/auth';
import { Camera, Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react';
import { auth } from '../firebase'; // Make sure this path is correct

const Login = () => {
    // 1. State for inputs and potential errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    };

    // 2. The improved login handler function
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload
        setError(''); // Reset errors on new submission

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log("Logged in as:", userCredential.user);
            window.location.href = '/dashboard';
            localStorage.setItem('token', userCredential.user.accessToken); // Store token if needed
            // Success! You can redirect the user to the dashboard here.
        } catch (err) {
            console.error("Login error:", err.code);
            // 3. Provide user-friendly error messages
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError("Invalid email or password. Please try again.");
            } else {
                setError("An error occurred during login. Please try again later.");
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
                    <h1 className='text-3xl font-bold'>Welcome back</h1>
                    <p className='text-gray-500'>Sign in to your account to continue</p>
                </div>

                {/* 4. Use a <form> with the onSubmit handler */}
                <form className='w-full' onSubmit={handleLogin}>
                    <div className='flex flex-col justify-between w-full *:py-2'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='john@gmail.com'
                            className='p-2 border rounded-[10px]'
                            // 5. Connect input to the 'email' state
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className='flex flex-col justify-between w-full relative *:py-2'>
                            <label htmlFor="password" className='font-semibold'>Password</label>
                            <input
                                type={isOpen ? "text" : "password"}
                                id="password"
                                placeholder='Enter Your Password'
                                className='p-2 border rounded-[10px]'
                                // 6. Connect input to the 'password' state
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div onClick={toggleIsOpen} className='absolute bottom-2 right-3 cursor-pointer'>
                                {isOpen ? <Eye /> : <EyeClosed />}
                            </div>
                        </div>
                    </div>

                    {/* 7. Display the error message if it exists */}
                    {error && <p className='text-red-500 text-sm my-2'>{error}</p>}

                    <button type="submit" className='bg-primary w-full p-3 text-white text-lg rounded-2xl cursor-pointer my-5'>
                        Sign In
                    </button>
                </form>

                <p>Don't have an account? <a href="/signup" className='text-blue-800'>Sign up</a></p>
            </div>
        </div>
    );
};

export default Login;