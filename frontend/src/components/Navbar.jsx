

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/assets/logo.png";
import "../index.css";

export default function Navbar({colour, bgColour}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            let username = JSON.parse(storedUser);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser(username);
            console.log("USER FROM LOCAL STORAGE:", user);

        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
console.log("colour:", colour, "bgColour:", bgColour);

    return (
        <>

            <div className="flex justify-around">
                <img className="w-[150px] absolute left-[8%] top-[20px]" src={logo} alt="Logo" />

                <div className={`bg-[${colour}] text-2xl font-mono flex justify-between items-center p-4 rounded-full shadow-[${bgColour}] shadow-xl w-[50%] h-[100px] mt-5`}>

                    {[
                        { name: "Purchases", path: "/purchases" },
                        { name: "Transfers", path: "/transfers" },
                        { name: "Assignments", path: "/assignments" },
                        { name: "Expenditures", path: "/expenditures" },
                    ].map((item) => (
                        <h2
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className="rounded-full px-4 py-2 hover:bg-[#4B5320] transition-all duration-300 hover:text-emerald-100 cursor-pointer hover:scale-110"
                        >
                            {item.name}
                        </h2>
                    ))}

                </div>


                <h1
                    onClick={handleLogout}
                    className="absolute right-[8%] top-[45px] underline hover:bg-[#737a45] hover:text-emerald-100 hover:px-5 hover:py-2 duration-300 rounded-full cursor-pointer text-4xl"
                    title="LogOut"
                >
                    LogOut
                </h1>
            </div>


            <div className="w-full mt-[30px] flex justify-center">
                <h1 className="text-black font-bold capitalize font-mono text-2xl">
                    Welcome{" "}
                    <span className="font-bold capitalize">
                        {user?.role}!!!
                    </span>
                </h1>
            </div>
            <h1 onClick={() => navigate("/dashboard")} className="text-4xl writing-vertical text-orientation-upright font-bold absolute right-[4%] bg-[#737a45] p-6 rounded-full shadow-2xl shadow-[#4B5320] cursor-pointer hover:scale-x-105 hover:scale-y-105 transition-all  ">DASHBOARD</h1>
        </>
    );
}
