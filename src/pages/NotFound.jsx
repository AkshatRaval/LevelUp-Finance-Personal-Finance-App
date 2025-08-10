import { CreditCard } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FinanceApp404 = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const goHome = () => {
        console.log('Navigating to dashboard...');
        // In a real app: navigate('/dashboard');
    };

    const goToPortfolio = () => {
        console.log('Navigating to portfolio...');
        // In a real app: navigate('/portfolio');
    };

    const contactSupport = () => {
        console.log('Opening support...');
        // In a real app: navigate('/support');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-32 h-32 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-indigo-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Floating Icons */}
            <div className="absolute top-10 right-10 text-blue-200 opacity-30 animate-bounce hidden lg:block">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.1 3.89 23 5 23H19C20.1 23 21 22.1 21 21V9M19 9H14V4H5V21H19V9Z" />
                </svg>
            </div>

            <div className="absolute bottom-10 left-10 text-indigo-200 opacity-30 animate-bounce hidden lg:block" style={{ animationDelay: '0.5s' }}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9Z" />
                </svg>
            </div>

            <div className={`max-w-2xl w-full text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* Logo/Brand Area */}
                <div className="mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform">
                        <CreditCard size={28} color='white' />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        LevelUp Finance
                    </h2>
                </div>

                {/* Error Content */}
                <div className="mb-12">
                    <div className="relative">
                        <h1 className="text-8xl md:text-9xl font-bold text-gray-200 mb-4 relative">
                            404
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                                404
                            </div>
                        </h1>
                    </div>

                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
                        The page you're looking for seems to have vanished from our portfolio.
                        Let's get you back on track with your financial journey.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 mb-12">
                    <Link
                        to={'/'}
                        className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                        Return to Home
                    </Link>

                </div>

                {/* Feature Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
                        <p className="text-gray-600 text-sm">Check your latest transactions and account updates</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance</h3>
                        <p className="text-gray-600 text-sm">View your investment returns and analytics</p>
                    </div>
                </div>

                {/* Animated Chart Indicator */}
                <div className="mt-8 flex justify-center space-x-1 opacity-30">
                    {[1, 2, 3, 4, 5].map((bar) => (
                        <div
                            key={bar}
                            className="w-2 bg-blue-400 rounded-full animate-pulse"
                            style={{
                                height: `${Math.random() * 20 + 10}px`,
                                animationDelay: `${bar * 0.2}s`
                            }}
                        ></div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-12 text-sm text-gray-500">
                    Need assistance?
                    <a href="#" className="text-blue-600 hover:text-blue-700 ml-1 font-medium transition-colors duration-200">
                        Contact Support →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FinanceApp404;