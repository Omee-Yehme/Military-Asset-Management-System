import { useEffect, useState } from "react";
import { getPurchases, getBases, getAssets } from "../api/purchaseApi";
import api from "../api//axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


export default function Purchases() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [purchases, setPurchases] = useState([]);
  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();



  const [filters, setFilters] = useState({
    baseName: "",
    assetName: "",
    date: ""
  });


  const [showAddPurchase, setShowAddPurchase] = useState(false);
  const [newPurchase, setNewPurchase] = useState({
    baseId: "",
    assetId: "",
    quantity: ""
  });


    const filteredAssets = newPurchase.baseId
    ? assets.filter(a => a.baseId === newPurchase.baseId)
    : [];

  const loadAll = async () => {
    try {
      const [pRes, bRes, aRes] = await Promise.all([
        getPurchases(filters),
        getBases(),
        getAssets(),
      ]);

      setBases(bRes.data);
      setAssets(aRes.data);
      setPurchases(pRes.data);
    } catch {
      alert("Failed to load data");
    }
  };

  useEffect(() => {

  if (user.role !== "Admin" && user.role !== "LogisticsOfficer") {
    navigate("/unauthorized");
    return;
  }
  document.title = "MAMS - Purchases";
  // eslint-disable-next-line react-hooks/set-state-in-effect
  loadAll();  
}, []);


  const handleAddPurchase = async () => {
    if (!newPurchase.baseId || !newPurchase.assetId || !newPurchase.quantity) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/purchases", {
        baseId: newPurchase.baseId,
        assetId: newPurchase.assetId,
        quantity: parseInt(newPurchase.quantity, 10),
      });

      if (res.data.success) {
        alert("Purchase added successfully!");
        setShowAddPurchase(false);
        setNewPurchase({ baseId: "", assetId: "", quantity: "" });
        loadAll();
        console.log("Purchase added:", res.data.purchase);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Failed to add purchase");
    }
  };

  return (
    <div>
      <Navbar colour="#f2cc6c" bgColour="#786136" />

      <div className="p-8 w-[80%] mx-auto font-mono">


        <div
          className="fixed w-[120px] h-[120px] hover:text-white text-xl font-semibold rounded-full text-center flex justify-center items-center absolute left-[3%] top-[30%] bg-[#786136] text-black cursor-pointer hover:scale-105 transition-all shadow-[#f2cc6c] shadow-xl"
          onClick={() => setShowAddPurchase(true)}
        >
          Add Purchase
        </div>



        <div className="mb-6 flex justify-end mr-[5%] flex-wrap gap-4 items-end">
          <select
            className="p-2"
            onChange={(e) => setFilters({ ...filters, baseName: e.target.value })}
          >
            <option value="">All Bases</option>
            {bases.map((b) => (
              <option key={b._id} value={b.name}>{b.name}</option>
            ))}
          </select>

          <select
            className="p-2"
            onChange={(e) => setFilters({ ...filters, assetName: e.target.value })}
          >
            <option value="">All Assets</option>
            {assets.map((a) => (
              <option key={a._id} value={a.name}>{a.name}</option>
            ))}
          </select>

          <input
            type="date"
            className="p-2"
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />

          <button
            onClick={loadAll}
            className="bg-[#f2cc6c] hover:text-white hover:bg-[#786136] px-4 py-2 rounded-full text-black p-6 transition"
          >
            Apply
          </button>
        </div>


        <table className="w-full border text-center">
          <thead className="bg-[#786136] text-white">
            <tr>
              <th className="border p-2">Asset</th>
              <th className="border p-2">Base</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p._id} className="hover:bg-gray-100">
                <td className="border p-2">
                  {assets.find(a => a._id === p.assetId)?.name || "Unknown Asset"}
                </td>
                <td className="border p-2">
                  {bases.find(b => b._id === p.baseId)?.name || "Unknown Base"}
                </td>
                <td className="border p-2 text-center">{p.quantity}</td>
                <td className="border p-2">
                  {new Date(p.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>


      {showAddPurchase && (
        <div className="fixed font-mono inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-4">Add Purchase</h2>
              <button
                onClick={() => setShowAddPurchase(false)}
                className="text-red-600 cursor-pointer mb-4 text-xl"
              >
                ✖
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <select
                className="border p-2"
                value={newPurchase.baseId}
                onChange={(e) =>
                  setNewPurchase({
                    baseId: e.target.value,
                    assetId: "",   // reset asset when base changes
                    quantity: newPurchase.quantity
                  })
                }
              >
                <option value="">Select Base</option>
                {bases.map((b) => (
                  <option key={b._id} value={b._id}>{b.name}</option>
                ))}
              </select>


              <select
                className="border p-2"
                value={newPurchase.assetId}
                disabled={!newPurchase.baseId || filteredAssets.length === 0}
                onChange={(e) => setNewPurchase({ ...newPurchase, assetId: e.target.value })}
              >
                <option value="">
                  {!newPurchase.baseId
                    ? "Select base first"
                    : filteredAssets.length === 0
                      ? "No assets available at this base"
                      : "Select Asset"}
                </option>

                {filteredAssets.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.name}
                  </option>
                ))}
              </select>


              <input
                type="number"
                placeholder="Quantity"
                className="border p-2"
                value={newPurchase.quantity}
                onChange={(e) => setNewPurchase({ ...newPurchase, quantity: e.target.value })}
              />

              <div className="flex justify-end gap-4 mt-2">
                <button
                  className="bg-[#f2cc6c] cursor-pointer text-black px-4 py-2 rounded"
                  onClick={() => setShowAddPurchase(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#f2cc6c] hover:text-white hover:bg-[#786136] text-black cursor-pointer px-4 py-2 rounded"
                  onClick={handleAddPurchase}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
