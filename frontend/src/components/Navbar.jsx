import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "/assets/logo.png";
import "../index.css";

export default function Navbar({ colour, bgColour }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [hovered, setHovered] = useState(null);

    const [showBases, setShowBases] = useState(false);
    const [bases, setBases] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const loadBases = async () => {
        try {
            const res = await api.get("/bases");
            setBases(res.data);
            setShowBases(true);
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            alert("Failed to load bases");
        }
    };


    return (
        <>
            <div className="sticky top-0 z-50 flex justify-around">
                <img className="w-[150px] absolute left-[8%] top-[20px]" src={logo} alt="Logo" />


                <h3
                    onClick={loadBases}
                    className="absolute text-2xl font-mono left-[3%] top-[320%] cursor-pointer hover:text-green-700 hover:underline"
                >
                    View Base
                </h3>

                <div
                    style={{
                        backgroundColor: colour,
                        boxShadow: `0 20px 25px -5px ${bgColour}`,
                    }}
                    className="text-2xl font-mono flex justify-between items-center p-4 rounded-full shadow-xl w-[50%] h-[100px] mt-5"
                >
                    {[
                        { name: "Purchases", path: "/purchases" },
                        { name: "Transfers", path: "/transfers" },
                        { name: "Assignments", path: "/assignments" },
                        { name: "Expenditures", path: "/expenditures" },
                    ].map((item) => (
                        <h2
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            onMouseEnter={() => setHovered(item.name)}
                            onMouseLeave={() => setHovered(null)}
                            style={{ backgroundColor: hovered === item.name ? bgColour : "transparent" }}
                            className="rounded-full px-4 py-2 transition-all duration-300 hover:text-white cursor-pointer hover:scale-110"
                        >
                            {item.name}
                        </h2>
                    ))}
                </div>


                <h1
                    onClick={handleLogout}
                    onMouseEnter={() => setHovered("log")}
                    onMouseLeave={() => setHovered(null)}
                    style={{ backgroundColor: hovered === "log" ? bgColour : "transparent" }}
                    className="absolute right-[8%] top-[45px] underline hover:text-white hover:px-5 hover:py-2 duration-300 rounded-full cursor-pointer text-4xl"
                >
                    LogOut
                </h1>
            </div>

            <div className="w-full mt-[30px] flex justify-center">
                <h1 className="text-black font-bold capitalize font-mono text-2xl">
                    Welcome <span>{user?.role}!!!</span>
                </h1>
            </div>

            <h1
                style={{
                    backgroundColor: colour,
                    boxShadow: `0 20px 25px -5px ${bgColour}`,
                }}
                onClick={() => navigate("/dashboard")}
                className="fixed text-4xl writing-vertical text-orientation-upright font-bold absolute right-[4%] p-6 rounded-full shadow-2xl cursor-pointer hover:scale-105 hover:text-white transition-all"
            >
                DASHBOARD
            </h1>

            {showBases && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="bg-white w-[650px] max-h-[80vh] overflow-y-auto rounded-xl p-6">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-2xl font-bold">All Bases</h2>
                            <button
                                onClick={() => setShowBases(false)}
                                className="text-red-600 text-xl"
                            >
                                ✖
                            </button>
                        </div>

                        <table className="w-full border">
                            <thead className="bg-[#4B5320] text-white">
                                <tr>
                                    <th className="border p-2">Base ID</th>
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bases.map((b) => (
                                    <tr key={b._id} className="hover:bg-gray-100">
                                        <td className="border p-2 text-xs">{b._id}</td>
                                        <td className="border p-2 font-semibold">{b.name}</td>
                                        <td className="border p-2">{b.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}
