import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Expenditures() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [list, setList] = useState([]);
  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    baseId: "",
    assetId: "",
    quantity: "",
    reason: "",
    dateExpended: ""
  });

  const availableAssets = form.baseId
    ? assets.filter(a => a.baseId === form.baseId)
    : [];

  const loadData = async () => {
    try {
      const [e, b, a] = await Promise.all([
        api.get("/expenditures"),
        api.get("/bases"),
        api.get("/assets")
      ]);
      setList(e.data);
      setBases(b.data);
      setAssets(a.data);
    } catch {
      console.log("Failed to load expenditures");
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {


    if (user.role !== "Admin" && user.role !== "BaseCommander") {
      navigate("/unauthorized");
      return;
    }
    document.title = "MAMS - Expenditures";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();   // Only allowed roles hit API
  }, []);


  const handleExp = async () => {
    if (!form.baseId || !form.assetId || !form.quantity || !form.reason || !form.dateExpended) {
      alert("Fill all fields");
      return;
    }

    try {
      await api.post("/expenditures", {
        assetId: form.assetId,
        baseId: form.baseId,
        quantity: parseInt(form.quantity),
        reason: form.reason,
        dateExpended: form.dateExpended
      });

      setShowModal(false);
      setForm({ baseId: "", assetId: "", quantity: "", reason: "", dateExpended: "" });
      loadData();
      alert("Expenditure recorded successfully");
    } catch {
      alert("Failed to record expenditure");
    }
  };

  return (
    <div>
      <Navbar colour="#0071dc" bgColour="#002344" />

      <div className="p-8 w-[80%] mx-auto font-mono">
        {(user.role === "Admin" || user.role === "BaseCommander") && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#0071dc] text-white px-6 py-3 rounded-full mb-6 hover:scale-105 transition"
          >
            Record Expenditure
          </button>
        )}


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map(e => (
            <div key={e._id} className="bg-white p-5 rounded-xl shadow border-l-8 border-[#002344]">
              <h3 className="font-bold text-xl">
                {assets.find(a => a._id === e.assetId)?.name || "Unknown Asset"}
              </h3>
              <p>Base: {bases.find(b => b._id === e.baseId)?.name}</p>
              <p>Reason: <b>{e.reason}</b></p>
              <p>Quantity Used: <b>{e.quantity}</b></p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(e.dateExpended).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-[420px] rounded-xl">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Record Expenditure</h2>
              <button className="text-red-600 text-xl" onClick={() => setShowModal(false)}>✖</button>
            </div>

            <div className="flex flex-col gap-4">

              <select
                className="border p-2"
                value={form.baseId}
                onChange={(e) =>
                  setForm({
                    baseId: e.target.value,
                    assetId: "",
                    quantity: form.quantity,
                    reason: form.reason,
                    dateExpended: form.dateExpended
                  })
                }
              >
                <option value="">Select Base</option>
                {bases.map(b => (
                  <option key={b._id} value={b._id}>{b.name}</option>
                ))}
              </select>

              <select
                className="border p-2"
                disabled={!form.baseId || availableAssets.length === 0}
                value={form.assetId}
                onChange={(e) => setForm({ ...form, assetId: e.target.value })}
              >
                <option value="">
                  {!form.baseId
                    ? "Select base first"
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
                className="border p-2"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />

              <input
                type="text"
                placeholder="Reason (e.g. Used in field training)"
                className="border p-2"
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
              />

              <input
                type="datetime-local"
                className="border p-2"
                value={form.dateExpended}
                onChange={(e) => setForm({ ...form, dateExpended: e.target.value })}
              />

              <div className="flex justify-end gap-4 mt-2">
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                  Cancel
                </button>

                <button
                  onClick={handleExp}
                  className="bg-[#002344] text-white px-4 py-2 rounded hover:scale-105"
                >
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
