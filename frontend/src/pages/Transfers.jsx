import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

import { useNavigate } from "react-router-dom";

export default function Transfers() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [transfers, setTransfers] = useState([]);
  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    fromBaseId: "",
    toBaseId: "",
    assetId: "",
    quantity: ""
  });

  const availableAssets = form.fromBaseId
  ? assets.filter(a => a.baseId === form.fromBaseId)
  : [];

  const loadData = async () => {
    try {
      const [t, b, a] = await Promise.all([
        api.get("/transfers"),
        api.get("/bases"),
        api.get("/assets")
      ]);
      setTransfers(t.data);
      setBases(b.data);
      setAssets(a.data);
    } catch {
      alert("Failed to load transfers");
    }
  };

  useEffect(() => {

  if (user.role !== "Admin" && user.role !== "LogisticsOfficer") {
    navigate("/unauthorized");
    return;
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  loadData();  
}, []);

  const handleSubmit = async () => {
    if (!form.fromBaseId || !form.toBaseId || !form.assetId || !form.quantity) {
      alert("Fill all fields");
      return;
    }
    
    if (form.fromBaseId === form.toBaseId) {
      alert("From & To base cannot be same");
      return;
    }
    
    try {
      await api.post("/transfers", {
        ...form,
        quantity: parseInt(form.quantity)
      });

      setShowModal(false);
      setForm({ fromBaseId: "", toBaseId: "", assetId: "", quantity: "" });
      loadData();
      alert("Transfer successful");
    } catch {
      alert("Transfer failed");
    }
  };
  
  return (
    <div className="font-mono">
      <Navbar colour="#ffe9ac" bgColour="#655c44"/>

      <div className="p-8 w-[80%] mx-auto font-mono">

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#786136] text-white px-6 py-3 rounded-full shadow-xl mb-6"
        >
          New Transfer
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {transfers.map(t => (
            <div
              key={t._id}
              className="bg-white p-5 rounded-xl shadow-lg border-l-8 border-[#786136]"
            >
              <h3 className="text-xl font-bold mb-2">
                {assets.find(a => a._id === t.assetId)?.name}
              </h3>

              <p>From: <b>{bases.find(b => b._id === t.fromBaseId)?.name}</b></p>
              <p>To: <b>{bases.find(b => b._id === t.toBaseId)?.name}</b></p>
              <p>Quantity: <b>{t.quantity}</b></p>

              <p className="text-sm text-gray-500 mt-2">
                {new Date(t.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">Transfer Asset</h2>

            <select
              className="border p-2 w-full mb-3"
              value={form.fromBaseId}
              onChange={e => setForm({ ...form, fromBaseId: e.target.value, assetId: "" })}
            >
              <option value="">From Base</option>
              {bases.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
            </select>

            <select
              className="border p-2 w-full mb-3"
              value={form.toBaseId}
              onChange={e => setForm({ ...form, toBaseId: e.target.value })}
            >
              <option value="">To Base</option>
              {bases.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
            </select>

            <select
              className="border p-2 w-full mb-3"
              value={form.assetId}
              disabled={!form.fromBaseId || availableAssets.length === 0}
              onChange={e => setForm({ ...form, assetId: e.target.value })}
            >
              <option>
                {!form.fromBaseId
                  ? "Select From Base"
                  : availableAssets.length === 0
                    ? "No assets at this base"
                    : "Select Asset"}
              </option>

              {availableAssets.map(a => (
                <option key={a._id} value={a._id}>{a.name}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Quantity"
              className="border p-2 w-full mb-3"
              value={form.quantity}
              onChange={e => setForm({ ...form, quantity: e.target.value })}
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="bg-[#786136] text-white px-4 py-2 rounded"
              >
                Transfer
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
