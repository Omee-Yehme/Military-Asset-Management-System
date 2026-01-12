import img from "/assets/emblem.jpg";
import admin from "/assets/admin.png";
import base from "/assets/bc.png";
import logs from "/assets/lg.png";
import mil from "/assets/mil.jpg";

import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [showLogin, setShowLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const res = isRegister
                ? await registerUser({ email, password })
                : await loginUser({ email, password });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen font-mono relative overflow-hidden">
            <div className="flex h-full w-full overflow-hidden">
                {/* Left Image */}
                <div className="w-[800px] flex items-center justify-center text-white overflow-hidden">
                    <img className="w-full h-full object-cover" src={img} />
                </div>

                <div className="absolute inset-0 bg-white/10 backdrop-blur-[5px]"></div>

                <div className="absolute inset-0 flex items-center">
                    <h1 className="p-60 text-[50px] font-bold text-gray-300">
                        <span className="text-[100px] text-white">M</span>ilitary{" "}
                        <span className="text-[100px] text-white">A</span>sset{" "}
                        <span className="text-[100px] text-white">M</span>anagement{" "}
                        <span className="text-[100px] text-white">S</span>ystem
                    </h1>
                </div>

                {/* Right Panel */}
                <div className="w-1/2 h-screen absolute right-0 bg-white flex items-center justify-center rounded-l-3xl overflow-hidden">
                    <img src={mil} className="absolute w-full h-full object-cover" />

                    {!showLogin ? (
                        <div className="absolute w-full h-full flex flex-col justify-center items-center">
                            <h1 className="text-[80px] font-bold mb-10">Are You</h1>

                            <img
                                className="w-[200px] hover:border-[15px] hover:border-[#737a54] rounded-full cursor-pointer transition"
                                src={admin}
                                onClick={() => setShowLogin(true)}
                            />

                            <div className="flex mb-10 gap-10 mt-6">
                                <img
                                    className="w-[200px] hover:border-[15px] hover:border-[#737a54] rounded-full cursor-pointer transition"
                                    src={base}
                                    onClick={() => setShowLogin(true)}
                                />
                                <img
                                    className="w-[200px] hover:border-[15px] hover:border-[#737a54] rounded-full cursor-pointer transition"
                                    src={logs}
                                    onClick={() => setShowLogin(true)}
                                />
                            </div>

                            <h1 className="text-3xl underline cursor-pointer">
                                New Here? Register
                            </h1>
                        </div>
                    ) : (
                        <div className="absolute w-[500px] h-[500px] p-20 rounded-3xl bg-[#737a45] shadow-xl">
                            <h2 className="text-[50px] font-semibold mb-6 text-center">
                                {isRegister ? "Register" : "Login"}
                            </h2>

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full mb-4 px-4 py-2 border rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full mb-4 px-4 py-2 border rounded pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    className="absolute right-3 top-3 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    👁
                                </span>
                            </div>

                            {error && (
                                <p className="text-red-500 text-center mb-2">{error}</p>
                            )}

                            <button
                                onClick={() => {
                                    console.log("LOGIN CLICKED");
                                    handleLogin();
                                }}
                                disabled={loading}
                                className="w-full bg-black hover:bg-[#acbb5a] text-white py-2 rounded flex justify-center items-center"
                            >
                                {loading ? (
                                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                ) : isRegister ? (
                                    "Register"
                                ) : (
                                    "Login"
                                )}
                            </button>

                            <p
                                onClick={() => setIsRegister(!isRegister)}
                                className="text-center mt-4 underline cursor-pointer"
                            >
                                {isRegister
                                    ? "Already have an account? Login"
                                    : "New here? Register"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
