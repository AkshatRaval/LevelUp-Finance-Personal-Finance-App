import { CreditCard, LayoutDashboard, LogOut, PieChart, Plus, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContexts';
import { signOut } from 'firebase/auth';
// Import Link, useLocation, and useNavigate for SPA navigation
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state

    // ---- HOOKS FOR NAVIGATION ----
    const location = useLocation(); // Gets the current URL path
    const navigate = useNavigate(); // Hook for programmatic navigation

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser?.uid) {
                const userDocRef = doc(db, "users", currentUser.uid);
                try {
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists()) {
                        setUserData(userDocSnap.data());
                    } else {
                        console.log("No user found with that ID!");
                    }
                } catch (error) {
                    console.error("Error fetching user document:", error);
                } finally {
                    setLoading(false); // Stop loading after fetch attempt
                }
            } else {
                setLoading(false); // If no user, stop loading
            }
        };
        fetchUserData();
    }, [currentUser]);

    // Menu items with correct paths
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'transactions', label: 'Transactions', icon: CreditCard, path: '/dashboard/transactions' },
        { id: 'budget', label: 'Budget', icon: PieChart, path: '/dashboard/budget' },
        { id: 'profile', label: 'Profile', icon: User, path: '/dashboard/profile' },
    ];

    // Uses useNavigate for SPA-friendly redirection
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
    const renderUserInitials = () => {
        if (loading) return '...';
        if (userData?.name) {
            return userData.name.split(' ').map(n => n[0]).join('');
        }
        return <User size={18} />; 
    };

    return (
        <section className="w-64 h-screen bg-white border-border border-r relative flex flex-col">
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-xl">LevelUp Finance</h2>
                        <p className="text-xs text-muted-foreground">Your Personal Finance</p>
                    </div>
                </div>
            </div>
            <div className="p-4 border-b border-border">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-accent-foreground p-2">
                            {renderUserInitials()}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium truncate">{loading ? 'Loading...' : userData?.name || 'User'}</p>
                        <p className="text-sm text-muted-foreground truncate">{loading ? '...' : userData?.email || ''}</p>
                    </div>
                </div>
                <Link to="/add-transaction" className="flex items-center justify-center gap-2 text-sm bg-primary text-primary-foreground py-2 rounded-sm hover:bg-primary/90 transition-all">
                    <Plus size={20} />
                    Add Transaction
                </Link>
            </div>
            {/* Main navigation section */}
            <div className="p-4 flex-grow">
                <nav className="space-y-2">
                    {menuItems.map(item => (
                        <Link
                            key={item.id}
                            to={item.path} 
                            className={`w-full text-left flex items-center gap-2 text-lg text-muted-foreground transition-colors cursor-pointer p-2 rounded-md hover:bg-accent ${location.pathname === item.path ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}>
                            <item.icon size={16} />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
            {/* Logout button */}
            <div className="p-4 border-t border-border">
                <button className='text-lg flex gap-2 items-center justify-center border border-red-500 rounded-sm w-full py-2 px-5 text-red-500 hover:bg-red-500 hover:text-primary-foreground transition-colors' onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </section>
    );
};

export default Sidebar;
