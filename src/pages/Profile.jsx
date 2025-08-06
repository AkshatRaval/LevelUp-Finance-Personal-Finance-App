import { Edit, Moon, Settings, Shield, Sun, User, Wallet } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContexts'
import { useUserData } from '../utils/useUserData'

const Profile = () => {

    const [isEditing, setIsEditing] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const { userData } = useUserData();
    console.log("User Data:", userData);
    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }
    const toggleDark = () => {
        setIsDark(!isDark)
    }


    return (
        <div className='w-full'>
            <div>
                <h1 className='text-4xl font-bold '>Profile & Settings</h1>
                <p className='text-lg text-muted-foreground'>Manage your account and preferences</p>
            </div>
            <div className='flex w-full mt-4 gap-6'>
                <div className='w-full'>
                    <div className='border border-border bg-white rounded-lg p-4 mt-4 '>
                        <div className='flex justify-between items-center mb-4'>
                            <p className='flex items-center gap-2 text-lg'><User size={18} />Pesonal Information</p>
                            <button className='flex items-center gap-2 text-lg border border-border bg-background p-2 rounded-lg hover:text-accent-foreground hover:bg-accent'> <Edit size={18} />Edit</button>
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
                </div>
                <div className='w-[50%]'>
                    <div className='border border-border bg-white rounded-lg p-4 mt-4 min-w-[20%]'>
                        <h1 className='flex items-center gap-2 mb-4 text-lg' ><Settings size={18} />Appearance</h1>
                        <div className='flex items-center gap-3 mt-4'>
                            {isDark ? <Moon /> : <Sun />}
                            <div className='flex-1 flex flex-col'>
                                <h1 className='text-lg'>Dark Mode</h1>
                                {isDark ? <p className='text-sm'>Dark Theme</p> : <p className='text-sm'>Light Theme</p>}
                            </div>
                            <label class="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="sr-only peer" />
                                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            </label>

                        </div>
                    </div>
                    <div className='border border-border bg-white rounded-lg p-4 mt-4 min-w-[20%]'>
                        <h1 className='flex items-center gap-2 mb-4 text-lg' ><Shield size={18} />Account</h1>
                        <button className='w-full my-1 hover:bg-accent text-lg hover:text-accent-foreground py-2 rounded-xl border border-border transition-all '><Wallet size={18} />Connected Accounts</button>
                        <button className='w-full my-1 flex items-center hover:bg-accent text-lg hover:text-accent-foreground text-red-500 py-2 rounded-xl border border-border transition-all px-2'><Shield size={18} />Security Setting</button>
                        <button className='w-full my-1 hover:bg-red-500 text-lg hover:text-white text-red-500 py-2 rounded-xl border border-red-500 transition-all'>Logout</button>
                    </div>

                </div>
            </div>

        </div >
    )
}

export default Profile