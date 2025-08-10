import { Bell, Edit, Moon, Settings, Shield, Sun, User, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useUserData } from '../utils/useUserData'
import Toggle from '../components/Toggle'
import { signOut } from 'firebase/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import AnimatedWrapper from '../components/AnimatedPage'

const Profile = () => {

    const [isEditing, setIsEditing] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const { userData } = useUserData();
    // console.log("User Data:", userData);
    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

    const toggleDark = () => {
        setIsDark(prev => {
            const newDark = !prev;
            document.documentElement.classList.toggle('dark', newDark);
            localStorage.setItem('darkMode', newDark);
            return newDark;
        });
    };


    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        setIsDark(darkMode);
        document.documentElement.classList.toggle('dark', darkMode); // Apply dark mode class based on localStorage
    }, [])

    const location = useLocation(); // Gets the current URL path
    const navigate = useNavigate(null)

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("token");
            console.log("User signed out successfully!");
            navigate('/'); // Redirect to homepage without a full reload
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const notifications = [
        {
            id: 1,
            title: "Transaction Alerts",
            description: "Get notified when transactions are added",
            function: () => { console.log("Security Alerts toggled") }
        },
        {
            id: 2,
            title: "Budget Alerts",
            description: "Receive alerts when approaching budget limits",
            function: () => { console.log("Security Alerts toggled") }
        },
        {
            id: 3,
            title: "Monthly Rports",
            description: "Receive monthly financial summaries",
            function: () => { console.log("Security Alerts toggled") }
        },
        {
            id: 4,
            title: "Security Alerts",
            description: "Important security and login notifications",
            function: () => { console.log("Security Alerts toggled") }
        },
    ]

    // const memberSince = userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A';
    // const totalTransactions = 0;
    // const totalBudget = userData?.budget || 0;
    // const totalIncome = userData?.income || 0;
    // const totalExpenses = 0;

    return (
        <div className='w-full text-foreground'>
            <AnimatedWrapper delay={0}>
                <div>
                    <h1 className='text-4xl font-bold'>Profile & Settings</h1>
                    <p className='text-lg text-muted-foreground'>Manage your account and preferences</p>
                </div>
            </AnimatedWrapper>

            <div className='flex flex-col w-full lg:flex-row mt-4 gap-6'>
                {/* Left Side */}
                <div className='w-full'>
                    <AnimatedWrapper delay={0.5}>
                        <div className='border border-border bg-card rounded-lg p-4 mt-4 '>
                            <div className='flex justify-between items-center mb-4'>
                                <p className='flex items-center gap-2 text-lg'><User size={18} />Pesonal Information</p>
                            </div>
                            <div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='border-b border-border py-2'>
                                        <p className='text-lg font-semibold'>Name</p>
                                        <p className='text-sm'>{userData?.name || 'N/A'}</p>
                                    </div>
                                    <div className='border-b border-border py-2'>
                                        <p className='text-lg font-semibold'>Email</p>
                                        <p className='text-sm'>{userData?.email || 'N/A'}</p>
                                    </div>
                                    <div className='border-b border-border py-2'>
                                        <p className='text-lg font-semibold'>Phone</p>
                                        <p className='text-sm '>{userData?.phone || 'N/A'}</p>
                                    </div>
                                    <div className='border-b border-border py-2'>
                                        <p className='text-lg font-semibold'>Occupation</p>
                                        <p className='text-sm '>{userData?.occupation || 'N/A'}</p>
                                    </div>
                                    <div className='border-b border-border py-2'>
                                        <p className='text-lg font-semibold'>Monthaly Income</p>
                                        <p className='text-sm '>₹{userData?.income || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedWrapper>
                    <AnimatedWrapper delay={0.7}>
                        <div className='border border-border bg-card text-foreground rounded-lg p-4 mt-4 '>
                            <h1 className='flex items-center gap-2 text-lg' ><Bell size={18} />Notification Preferences</h1>
                            <p className='mb-4 text-muted-foreground'>Choose what notifications you'd like to receive</p>

                            <div>

                                {notifications.map((notification) => (
                                    <div className='flex py-5 items-center justify-between gap-3 mb-2 border-b border-border' key={notification.id}>
                                        <div>
                                            <h1 className='text-xl font-semibold'>{notification.title}</h1>
                                            <p className='text-sm text-muted-foreground'>{notification.description}</p>
                                        </div>
                                        <Toggle fn={notification.function} />
                                    </div>
                                ))}

                            </div>

                        </div>
                    </AnimatedWrapper>
                </div>

                {/* Right Side */}
                <div className='w-full flex flex-col lg:w-[50%] gap-4 text-foreground'>
                    <AnimatedWrapper delay={0.5}>
                        <div className='border border-border bg-card rounded-lg p-4 mt-4 min-w-[20%]'>
                            <h1 className='flex items-center gap-2 mb-4 text-lg' ><Settings size={18} />Appearance</h1>
                            <div className='flex items-center gap-3 mt-4'>
                                {isDark ? <Moon /> : <Sun />}
                                <div className='flex-1 flex flex-col'>
                                    <h1 className='text-lg'>Dark Mode</h1>
                                    {isDark ? <p className='text-sm'>Dark Theme</p> : <p className='text-sm'>Light Theme</p>}
                                </div>
                                <Toggle fn={toggleDark} checked={isDark} />
                            </div>
                        </div>
                    </AnimatedWrapper>
                    <AnimatedWrapper delay={0.7}>
                        <div className='border border-border bg-card rounded-lg p-4 mt-4 min-w-[20%] mb-20'>
                            <h1 className='flex items-center gap-2 mb-4 text-lg' ><Shield size={18} />Account</h1>
                            <button className='w-full my-1 flex items-center hover:bg-accent text-lg hover:text-accent-foreground text-foreground py-2 rounded-xl border border-border transition-all px-4 gap-2'><Wallet size={18} />Connected Accounts</button>
                            <button className='w-full my-1 flex items-center hover:bg-accent text-lg hover:text-accent-foreground text-foreground py-2 rounded-xl border border-border transition-all px-4 gap-2'><Shield size={18} />Security Setting</button>
                            <button className='w-full my-1 hover:bg-destructive text-lg hover:text-foreground text-destructive py-2 rounded-xl border border-destructive transition-all' onClick={handleLogout}>Logout</button>
                        </div>
                    </AnimatedWrapper>
                </div>
            </div>

        </div >
    )
}

export default Profile