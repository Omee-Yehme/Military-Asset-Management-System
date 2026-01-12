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

    const [role, setRole] = useState("");
    const [baseId, setBaseId] = useState("");


    const navigate = useNavigate();

const handleLogin = async () => {
    if (!email || !password || (isRegister && !role)) {
        setError("All fields are required");
        return;
    }

    if (isRegister && role !== "Admin" && !baseId) {
        setError("Base ID is required for this role");
        return;
    }

    try {
        setLoading(true);
        setError("");

        if (isRegister) {
            const registerPayload = {
                email,
                password,
                role,
                baseId: role === "Admin" ? null : baseId,
            };

            const { password:_,...safepayload } = registerPayload;
            console.log("REGISTER PAYLOAD 👉", safepayload);

            await registerUser(registerPayload);

            setIsRegister(false);
            setPassword("");
            setBaseId("");
            setRole("");
            setError("Registration successful. Please login.");
            return;
        }

        const loginPayload = { email, password };


        const res = await loginUser(loginPayload);

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
                
                <div className="w-[800px] flex items-center justify-center text-white overflow-hidden">
                    <img className="w-full h-full object-cover" src={img} />
                </div>

                <div className="absolute inset-0 bg-white/10 backdrop-blur-[5px]"></div>

                <div className="absolute inset-0 w-[800px] flex items-center">
                    <h1 className="p-60 text-[50px] font-bold text-gray-300">
                        <span className="text-[100px] text-white">M</span>ilitary{" "}
                        <span className="text-[100px] text-white">A</span>sset{" "}
                        <span className="text-[100px] text-white">M</span>anagement{" "}
                        <span className="text-[100px] text-white">S</span>ystem
                    </h1>
                </div>


                <div className="w-1/2 h-screen absolute right-0 bg-white flex items-center justify-center rounded-l-3xl overflow-hidden">
                    <img src={mil} className="absolute w-full h-full object-cover" />

                    {!showLogin ? (
                        <div className="absolute w-full h-full flex flex-col justify-center items-center">
                            <h1 className="text-[80px] font-bold ">Are You</h1>

                            <img
                                className="w-[250px] hover:border-[15px] hover:border-[#737a54] rounded-full cursor-pointer transition-all"
                                src={admin}
                                onClick={() => setShowLogin(true)}
                            />

                            <div className="flex mb-10 gap-10 mt-6">
                                <img
                                    className="w-[250px] hover:border-[15px] hover:border-[#737a54] rounded-full cursor-pointer transition-all"
                                    src={base}
                                    onClick={() => setShowLogin(true)}
                                />
                                <img
                                    className="w-[250px] hover:border-[15px] hover:border-[#737a54] rounded-full cursor-pointer transition-all"
                                    src={logs}
                                    onClick={() => setShowLogin(true)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="absolute w-[500px] h-[500px] p-20 rounded-3xl bg-[#737a45] shadow-xl">
                            
                                {isRegister && (
                                    <>
                                        {/* Role Dropdown */}
                                        <select
                                            className="w-full mb-4 px-4 py-2 border rounded"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="BaseCommander">Base Commander</option>
                                            <option value="LogisticsOfficer">Logistics Officer</option>
                                        </select>

                                        {/* Base ID - Only if NOT Admin */}
                                        {role !== "Admin" && role !== "" && (
                                            <input
                                                type="text"
                                                placeholder="Base ID"
                                                className="w-full mb-4 px-4 py-2 border rounded"
                                                value={baseId}
                                                onChange={(e) => setBaseId(e.target.value)}
                                            />
                                        )}
                                    </>
                                )}

                            

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
                                className="w-full bg-black hover:text-black hover:bg-[#acbb5a] cursor-pointer transition-all text-white py-2 rounded flex justify-center items-center"
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
