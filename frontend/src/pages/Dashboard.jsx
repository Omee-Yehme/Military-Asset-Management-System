import { useEffect, useState } from "react";
import DashboardCards from "../components/DashboardCards";
import Navbar from "../components/Navbar";
import api from "../api/axios";

export default function Dashboard() {
  const [showAsset, setShowAsset] = useState(false);
  const [showBase, setShowBase] = useState(false);

  const [asset, setAsset] = useState({
    name: "",
    type: "",
    baseId: "",
    quantity: "",
  });

  const [base, setBase] = useState({
    name: "",
    location: "",
  });
    useEffect(() => {
    document.title = "MAMS - Dashboard";
  }, []);
    
  const addAsset = async () => {
    try {
      const res = await api.post("/assets", asset);
      alert("Asset Added");
      console.log(res.data.asset);
      setShowAsset(false);
    } catch (err) {
      alert(err.response?.data?.message || "Asset creation failed");
    }
  };

  const addBase = async () => {
    try {
      const res = await api.post("/bases", base);
      alert("Base Added");
      console.log(res.data.base);
      setShowBase(false);
    } catch (err) {
      alert(err.response?.data?.message || "Base creation failed");
    }
  };

  return (
    <div className="font-mono" >
      <Navbar colour="#737a45" bgColour="#4B5320" />
      <DashboardCards />


      <div
        onClick={() => setShowAsset(true)}
        className="fixed w-[120px] h-[120px] hover:text-white text-3xl font-semibold rounded-full text-center flex justify-center items-center absolute left-[3%] top-[30%] bg-[#737a45] text-black cursor-pointer hover:scale-105 transition-all shadow-[#4B5320] shadow-xl"
      >
        Add Asset
      </div>

      <div
        onClick={() => setShowBase(true)}
        className="fixed w-[120px] h-[120px] hover:text-white text-3xl font-semibold rounded-full text-center flex justify-center items-center absolute left-[3%] top-[60%] bg-[#737a45] text-black cursor-pointer hover:scale-105 transition-all shadow-[#4B5320] shadow-xl"
      >
        Add Base
      </div>


      {showAsset && (
        <div className="fixed inset-0 bg-black/60  flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg rounded-full w-[350px]">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Add Asset</h2>

            <button
                onClick={() => setShowAsset(false)}
                className="text-red-600 cursor-pointer mb-4 text-xl"
              >
                ✖
              </button>
            </div>

            <input
              placeholder="Asset Name"
              className="border p-2 w-full mb-2"
              onChange={(e) => setAsset({ ...asset, name: e.target.value })}
            />
            <input
              placeholder="Type (Vehicle, Weapon...)"
              className="border p-2 w-full mb-2"
              onChange={(e) => setAsset({ ...asset, type: e.target.value })}
            />
            <input
              placeholder="Base ID"
              className="border p-2 w-full mb-2"
              onChange={(e) => setAsset({ ...asset, baseId: e.target.value })}
            />
            <input
              placeholder="Quantity"
              type="number"
              className="border p-2 w-full mb-2"
              onChange={(e) => setAsset({ ...asset, quantity: e.target.value })}
            />

            <div className="flex  justify-between mt-4">
              <button
                onClick={() => setShowAsset(false)}
                className="bg-gray-400 cursor-pointer rounded-4xl px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={addAsset}
                className="bg-green-600 cursor-pointer rounded-4xl text-white px-4 py-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


      {showBase && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[350px]">
            

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">Add Base</h2>

            <button
                onClick={() => setShowBase(false)}
                className="text-red-600 cursor-pointer mb-4 text-xl"
              >
                ✖
              </button>
            </div>

            <input
              placeholder="Base Name"
              className="border p-2 w-full mb-2"
              onChange={(e) => setBase({ ...base, name: e.target.value })}
            />
            <input
              placeholder="Location"
              className="border p-2 w-full mb-2"
              onChange={(e) => setBase({ ...base, location: e.target.value })}
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowBase(false)}
                className="bg-gray-400 cursor-pointer rounded-full px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={addBase}
                className="bg-green-600 cursor-pointer rounded-full text-white px-4 py-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
