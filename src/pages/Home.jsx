import { Mail, Pin } from 'lucide-react';
import React from 'react'

const Home = () => {

  const features = [
    {
      title: "Smart Budgeting",
      description: "Automatically categorize expenses and manage your budget efficiently.",
      icon: "💡",
      color: "bg-yellow-100",
    },
    {
      title: "Real-Time Analytics",
      description: "Get visual insights into your spending with live charts and summaries.",
      icon: "📊",
      color: "bg-blue-100",
    },
    {
      title: "Goal Tracking",
      description: "Set financial goals and track your progress with helpful reminders.",
      icon: "🎯",
      color: "bg-green-100",
    },
    {
      title: "Secure & Private",
      description: "Your data is encrypted and stored with industry-leading security standards.",
      icon: "🔒",
      color: "bg-red-100",
    },
  ];


  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <div>
      <header className="bg-white shadow-lg rounded-b-3xl px-6 md:px-16 py-4">
        <div className="w-full flex items-center justify-between px-4 md:px-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <img src="/assets/Financelogo.png" alt="LevelUp Logo" className="w-32 md:w-40 object-contain" />
          </a>
          {/* Hamburger Icon */}
          <button
            className="md:hidden flex items-center px-3 py-2 border rounded text-gray-700 border-gray-300"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="fill-current h-6 w-6" viewBox="0 0 24 24">
              {navOpen ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
          <div className="hidden md:flex gap-10 items-center">
            {/* Navigation Links */}
            <nav className="flex items-center gap-8 text-[18px] font-medium">
              <a href="#home" className="hover:text-primary transition-all duration-200">Home</a>
              <a href="#features" className="hover:text-primary transition-all duration-200">Features</a>
              <a href="#about" className="hover:text-primary transition-all duration-200">About</a>
              <a href="#contact" className="hover:text-primary transition-all duration-200">Contact</a>
            </nav>
            {/* CTA Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full shadow-md transition-all duration-300 text-[18px]">
              <a href="/login">Get Started</a>
            </button>
          </div>
        </div>
        {/* Mobile Nav */}
        {navOpen && (
          <div className="md:hidden bg-white  shadow-lg rounded-b-xl px-4 py-4 absolute left-0 right-0 top-20 z-50">
            <nav className="flex flex-col gap-4 text-[18px] font-medium">
              <a href="#home" className="hover:text-primary transition-all duration-200" onClick={() => setNavOpen(false)}>Home</a>
              <a href="#features" className="hover:text-primary transition-all duration-200" onClick={() => setNavOpen(false)}>Features</a>
              <a href="#about" className="hover:text-primary transition-all duration-200" onClick={() => setNavOpen(false)}>About</a>
              <a href="#contact" className="hover:text-primary transition-all duration-200" onClick={() => setNavOpen(false)}>Contact</a>
              <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 text-center mt-2" onClick={() => setNavOpen(false)}>
                Get Started
              </a>
            </nav>
          </div>
        )}
      </header>
      {/* ...rest of your code remains unchanged... */}
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white min-h-[80vh] flex items-center" id='home'>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* <!-- Text content --> */}
          <div className="flex flex-col justify-center space-y-6 animate-fadeInLeft">
            <h1 className="text-4xl md:text-6xl font-bold">Take Control of Your Finances Today</h1>
            <p className="text-lg md:text-xl">Track expenses, set budgets, and achieve your financial goals effortlessly.</p>
            <div className="flex space-x-4">
              <a href="/login" className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-full shadow hover:bg-gray-100 transition">Get Started</a>
              <a href="#about" className="border-2 border-white text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-indigo-600 transition">Learn More</a>
            </div>
          </div>
          {/* <!-- Image content --> */}
          <div className="flex justify-center items-center animate-fadeInRight">
            <img src="assets/Dashboard.png" alt="App Dashboard" className="rounded-xl shadow-2xl max-h-[500px] w-auto" />
          </div>
        </div>
      </section>
      {/* ...rest of your code remains unchanged... */}
      {/* Features Section */}
      <section className="py-20 bg-gray-50" id='features'>
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-12 animate-fade-in-up">Key Features</h2>
        <div className="grid grid-cols-1 px-10 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 lg:px-50">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl w-full shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 animate-fade-in-up"
            >
              <div
                className={`h-16 w-16 flex items-center justify-center text-3xl rounded-full mx-auto mb-4 ${feature.color}`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-center mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-sm text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* ...rest of your code remains unchanged... */}
      <section className="relative bg-white py-16" id="about">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">About LevelUp Finance</h2>
          <p className="text-gray-600 text-lg mb-10">
            Our mission is to empower you with clear insights into your financial life. With easy budgeting,
            expense tracking, and personalized recommendations, we help you build a future of financial freedom.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
              <img src="assets/About-1.png" alt="Easy to Use" className="h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">User-Friendly</h3>
              <p className="text-gray-500">Designed with simplicity so anyone can start managing money confidently.</p>
            </div>
            <div className="p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
              <img src="assets/About-2.png" alt="Secure" className="h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Secure</h3>
              <p className="text-gray-500">Your financial data is protected with industry-standard encryption.</p>
            </div>
            <div className="p-6 rounded-lg shadow hover:shadow-xl transition duration-300">
              <img src="assets/About-3.png" alt="Insights" className="h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Powerful Insights</h3>
              <p className="text-gray-500">AI-driven analysis gives you actionable advice for smarter spending.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary relative">
        <div className="max-w-6xl mx-auto px-4 text-center grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-4xl font-bold text-white">5,000+</h3>
            <p className="text-white mt-2">Active Users</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-white">₹10 Cr+</h3>
            <p className="text-white mt-2">Tracked Budgets</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-white">98%</h3>
            <p className="text-white mt-2">Customer Satisfaction</p>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-fadeIn">What Our Users Say</h2>
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            <div className="bg-white rounded-xl p-6 shadow-md transform hover:scale-105 transition">
              <p className="text-gray-600 mb-4">"This app helped me finally take control of my budget. It's so easy to use and looks amazing!"</p>
              <h3 className="font-semibold text-lg">— Priya S.</h3>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md transform hover:scale-105 transition">
              <p className="text-gray-600 mb-4">"This app helped me finally take control of my budget. It's so easy to use and looks amazing!"</p>
              <h3 className="font-semibold text-lg">— Priya S.</h3>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md transform hover:scale-105 transition">
              <p className="text-gray-600 mb-4">"I love the clear charts and intuitive interface. Highly recommended for anyone serious about their money."</p>
              <h3 className="font-semibold text-lg">— Rahul K.</h3>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md transform hover:scale-105 transition">
              <p className="text-gray-600 mb-4">"Features like expense categorization and reminders saved me so much time and stress."</p>
              <h3 className="font-semibold text-lg">— Ananya R.</h3>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-gray-100 py-12 px-6 md:px-20 animate-fade-in-up" id='contact'>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <h4 className="text-xl font-semibold mb-4">About LevelUp</h4>
            <p className="text-gray-400">
              Empowering you to make better financial decisions with smart tools and insights.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition cursor-pointer"><a href="#home">Home</a></li>
              <li className="hover:text-white transition cursor-pointer"><a href="#features">Features</a></li>
              <li className="hover:text-white transition cursor-pointer"><a href="#about">About</a></li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400 mb-2 flex items-center gap-1"><Mail size={18} /> support@levelup.com</p>
            <p className="text-gray-400 flex items-center gap-1"><Pin size={18} /> Wankaner, Gujrat</p>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} LevelUp. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home