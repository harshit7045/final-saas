import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = Cookies.get("usertoken");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between border-b border-solid border-[#e7edf4] px-6 py-3 relative">
      {/* Logo and Title */}
      <div className="flex items-center gap-2 text-[#0d141c]">
        <a href="/" className="flex items-center gap-2">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
              fill="currentColor"
            ></path>
          </svg>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">OSINT</h2>
        </a>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex flex-1 justify-end gap-8">
        <a className="text-[#0d141c] text-sm font-medium hover:text-[#0d7cf2] mt-[10px]" href="/phoneosint">Phone OSINT</a>
        <a className="text-[#0d141c] text-sm font-medium hover:text-[#0d7cf2] mt-[10px]" href="/emailosint">Email OSINT</a>
        <a className="text-[#0d141c] text-sm font-medium hover:text-[#0d7cf2] mt-[10px]" href="/socialmediaosint">Social Media OSINT</a>
        <a className="text-[#0d141c] text-sm font-medium hover:text-[#0d7cf2] mt-[10px]" href="/imageosint">Reverse Image Search</a>
        <button
          onClick={handleButtonClick}
          className="text-sm bg-[#0d7cf2] rounded-lg px-4 py-2 text-white font-medium hover:bg-[#0b6ad4]"
        >
          {token ? "Profile" : "Login Or Sign Up"}
        </button>
      </nav>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-[#0d7cf2] focus:outline-none text-2xl">
        ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 md:hidden flex flex-col items-start space-y-3 z-50">
          <a className="text-[#0d141c] text-sm font-medium hover:text-[#0d7cf2]" href="/phoneosint">
            Phone OSINT
          </a>
          <a className="text-[#0d141c] text-sm font-medium hover:text-[#0d7cf2]" href="/emailosint">
            Email OSINT
          </a>
          <a className="text-[#0d141c] text-sm font-medium hover:text-[#0d7cf2]" href="/socialmediaosint">
            Social Media OSINT
          </a>
          <a className="text-[#0d141c] text-sm font-medium hover:text-[#0d7cf2]" href="/imageosint">
            Reverse Image Search
          </a>
          <button
            onClick={handleButtonClick}
            className="text-sm w-full bg-[#0d7cf2] rounded-lg px-4 py-2 text-white font-medium hover:bg-[#0b6ad4]"
          >
            {token ? "Profile" : "Login Or Sign Up"}
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
