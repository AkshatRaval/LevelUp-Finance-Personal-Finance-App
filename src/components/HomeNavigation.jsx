const Navigation = () => {


  return (
    <header className="bg-white shadow-lg rounded-b-3xl px-6 md:px-16 py-4">
      <div className="w-full flex items-center justify-between px-20">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <img src="/src/assets/Financelogo.png" alt="LevelUp Logo" className="w-32 md:w-40 object-contain" />
        </a>
        <div className="flex gap-10">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[18px] font-medium text-gray-700">
            <a href="#home" className="hover:text-blue-600 transition-all duration-200">Home</a>
            <a href="#features" className="hover:text-blue-600 transition-all duration-200">Features</a>
            <a href="#about" className="hover:text-blue-600 transition-all duration-200">About</a>
            <a href="#contact" className="hover:text-blue-600 transition-all duration-200">Contact</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full shadow-md transition-all duration-300 text-[18px]">
              <a href="/login">Get Started</a>
            </button>
          </div>
        </div>

      </div>
    </header>

  )
}

export default Navigation