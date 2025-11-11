import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginWithGoogleButton = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/profile");
  };

  const loginUser = async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("password").value;
    
    setErrorMessage("");
    
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }

    try {
      const backendUrl = `http://${import.meta.env.VITE_BACKEND_IP || 'localhost'}:${import.meta.env.VITE_BACKEND_PORT || '4002'}`;
      const response = await fetch(`${backendUrl}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.token) {
        Cookies.set("usertoken", data.token, { expires: 7 });
        handleLogin();
      } else {
        setErrorMessage(data.error || "Invalid email or password");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  return (
    <div className="relative flex items-center justify-center h-screen w-full  mb-[-5vh]" >
      <div className="absolute inset-0 bg-[#f8fafc] opacity-50 backdrop-blur-lg" ></div>
      <div className="relative z-10 flex items-center justify-center h-screen w-full px-5 sm:px-0">
        <div className="flex bg-[#f8fafc] rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsBlMlGPc6XyYMS91KyP_3FBLXgBjSKDnDSWxK6j1i_54EoXb7e6BeuwU&s=10)`,
            }}
          ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errorMessage}
            </div>
          )}
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="login-email"
            >
              Email Address
            </label>
            <input
              id="login-email"
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              required
              onChange={() => setErrorMessage("")}
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              onChange={() => setErrorMessage("")}
            />
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </a>
          </div>
          <div className="mt-8">
            <button
              className="bg-[#0d7cf2] text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
              onClick={loginUser}
            >
              Login
            </button>
          </div>


          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="#"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <span className="text-blue-700" onClick={handleClick}>
                {" "}
                Sign Up
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
    </div >
  );
};

export default LoginWithGoogleButton;
