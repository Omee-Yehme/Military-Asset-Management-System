
import img from "../assets/emblem.jpg";
import admin from "../assets/admin.png";
import base from "../assets/bc.png";
import logs from "../assets/lg.png";
import { useState } from "react";
import mil from "../assets/mil.jpg"

export function Login() {

    const [showLogin, setshowLogoin] = useState(false);


    return (
        <div className="h-screen font-mono relative overflow-hidden">



            <div className="flex h-full w-full overflow-hidden">
                <div className="w-[800px] flex items-center justify-center text-white overflow-hidden">
                    <img className=" w-full object-bottom h-full backdrop-opacity-10" src={img} />
                </div>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[5px]"></div>

                <div className="absolute inset-0 flex items-center ">
                    <h1 className=" font-mono w-[100px] p-60 text-[50px] font-bold text-gray-300"> <span className='text-[100px] text-white'>M</span>ilitary <span className='text-[100px] text-white'>A</span>sset <span className='text-[100px] text-white'>M</span>anagement <span className='text-[100px] text-white'>S</span>ystem</h1>
                </div>

                <div className="w-1/2 h-screen overflow-hidden absolute right-0 bg-white flex items-center justify-center rounded-l-3xl">
            <img src={mil} className="relative w-full h-full"/>


                    {!showLogin ? (<div className="absolute w-full h-full flex flex-col justify-center items-center">
                        <div><h1 className="text-[80px] font-mono font-bold">Are You</h1></div>
                        <img className="w-[250px] hover:border-[15px] hover:border-[#737a54] rounded-full cursor-pointer transition-all duration-200" src={admin} alt="Admin"
                            onClick={() => setshowLogoin(true)} />
                        <div className="flex gap-10"><img className="w-[250px] hover:border-[15px] hover:border-[#737a54] rounded-full cursor-pointer transition-all duration-200" src={base} alt="Base Commander"
                            onClick={() => setshowLogoin(true)} />
                            <img className="w-[250px] hover:border-[15px] hover:border-[#737a54] rounded-full cursor-pointer transition-all duration-200" src={logs} alt="Logistics Officer"
                                onClick={() => setshowLogoin(true)} /></div>
                    </div>) : (<div className="w-80 absolute  w-[500px] h-[500px] p-20 rounded-4xl bg-[#737a45] ">
                        <h2 className="text-[50px]  font-semibold mb-6 text-center">Login</h2>

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full mb-4 px-4 py-2 border rounded"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full mb-4 px-4 py-2 border rounded"
                        />

                        <button className="w-full bg-black hover:bg-[#acbb5a] text-white py-2 rounded cursor-pointer transition-colors duration-200">
                            Login
                        </button>
                    </div>)}



                </div>

            </div>
        </div>
    );
}

export default Login;
