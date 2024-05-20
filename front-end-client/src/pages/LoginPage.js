import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./auth/authSlice";

const LoginPage = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();

    if (username === 'admin' && password === 'password') {
      dispatch(login());
      navigate('/reception');
    } else {
      alert('Invalid credentials');
    }
  };
    return (
        <div>
            <section className="w-full h-full overflow-hidden">
                <img className="absolute top-0 left-0" src="https://res.cloudinary.com/dwywbuukd/image/upload/v1715137561/new/login_thkbom.jpg" alt="" />
                <div className="relative container px-4 mx-auto">
                    <div>
                        <a className="inline-block mx-auto mb-8 mt-16" href="/">
                            <img className="h-8" src="https://res.cloudinary.com/dwywbuukd/image/upload/v1715097915/new/logo_qbr1hv.png" alt="" />
                        </a>
                        <div className="max-w-sm mx-auto">
                            <div className="text-center">
                                <h3 className="font-heading tracking-tight text-4xl font-bold text-white mb-4">Login</h3>
                            </div>
                            <form onSubmit={handleLogin}>
                                <div className="mb-8">
                                    <label className="block mb-2 text-sm font-medium text-white" htmlFor="username">UserName</label>
                                    <input
                                        required
                                        className="py-2 px-4 h-11 w-full text-gray-400 placeholder-gray-400 bg-white bg-opacity-10 border border-white border-opacity-20 focus:border-emerald-900 rounded-lg outline-none ring ring-transparent focus:ring-emerald-800"
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="mb-8">
                                    <label className="block mb-2 text-sm font-medium text-white" htmlFor="password">Password</label>
                                    <div className="relative">
                                        <input
                                            required
                                            className="relative py-2 px-4 h-11 w-full text-gray-400 placeholder-gray-400 bg-white bg-opacity-10 border border-white border-opacity-20 focus:border-emerald-900 rounded-lg outline-none ring ring-transparent focus:ring-emerald-800"
                                            type="password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button className="mb-5 xs:flex-shrink-0 group relative flex w-full h-12 items-center justify-center px-4 p-px font-bold text-white bg-yellowGreen-600 rounded-lg transition-all duration-300 focus:outline-none" type="submit">
                                    <div className="absolute top-0 left-0 w-full h-full rounded-lg ring ring-yellowGreen-900 animate-pulse bg-blue-300 bg-opacity-10 hover:bg-opacity-30 transition duration-300"></div>
                                    <span>Login</span>
                                </button>
                                {/* <div className="mb-8 flex justify-end ">
                                    <a href="/login" className="block mb-2 text-sm font-medium text-white hover:text-gray-400">Forgot password?</a>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;