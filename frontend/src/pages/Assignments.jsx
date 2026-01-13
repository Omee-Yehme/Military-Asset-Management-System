

import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Assignments() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [assignments, setAssignments] = useState([]);
  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();


  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({
    baseId: "",
    assetId: "",
    quantity: "",
    assignedTo: ""
  });

  const filteredAssets = form.baseId
    ? assets.filter(a => a.baseId === form.baseId)
    : [];

  const loadAll = async () => {
    try {
      const [a, b, as] = await Promise.all([
        api.get("/assignments"),
        api.get("/bases"),
        api.get("/assets")
      ]);

      setAssignments(a.data);
      setBases(b.data);
      setAssets(as.data);
    } catch {
      console.log("Failed to load assignments");
    }
  };

  useEffect(() => {


    if (user.role !== "Admin" && user.role !== "BaseCommander") {
      navigate("/unauthorized");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAll();
  }, []);




  const handleAssign = async () => {
    if (!form.baseId || !form.assetId || !form.quantity || !form.assignedTo) {
      alert("Fill all fields");
      return;
    }

    try {
      await api.post("/assignments", {
        assetId: form.assetId,
        baseId: form.baseId,
        quantity: parseInt(form.quantity),
        assignedTo: form.assignedTo
      });

      setShowPopup(false);
      setForm({ baseId: "", assetId: "", quantity: "", assignedTo: "" });
      loadAll();
    } catch {
      alert("Assignment failed");
    }
  };

  return (
    <div>
      <Navbar colour="#d52525" bgColour="#8b0000" />

      <div className="p-8 w-[80%] mx-auto font-mono">

        <button
          onClick={() => setShowPopup(true)}
          className="bg-[#d52525] text-white px-6 py-3 rounded-full mb-8 hover:scale-105 transition"
        >
          Assign Asset
        </button>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.map(a => (
            <div
              key={a._id}
              className="bg-white p-5 rounded-xl shadow border-l-8 border-[#8b0000]"
            >
              <h3 className="text-xl font-bold">
                {assets.find(x => x._id === a.assetId)?.name || "Unknown Asset"}
              </h3>
              <p>Base: {bases.find(b => b._id === a.baseId)?.name}</p>
              <p>Assigned To: <b>{a.assignedTo}</b></p>
              <p>Quantity: <b>{a.quantity}</b></p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(a.assignmentDate).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>


      {showPopup && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-[420px] rounded-xl">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Assign Asset</h2>
              <button
                className="text-red-600 text-xl"
                onClick={() => setShowPopup(false)}
              >
                ✖
              </button>
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
                    assignedTo: form.assignedTo
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
                disabled={!form.baseId || filteredAssets.length === 0}
                value={form.assetId}
                onChange={(e) => setForm({ ...form, assetId: e.target.value })}
              >
                <option value="">
                  {!form.baseId
                    ? "Select base first"
                    : filteredAssets.length === 0
                      ? "No assets available at this base"
                      : "Select Asset"}
                </option>

                {filteredAssets.map(a => (
                  <option key={a._id} value={a._id}>{a.name}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Assigned To (e.g. Bravo Squad)"
                className="border p-2"
                value={form.assignedTo}
                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
              />

              <input
                type="number"
                placeholder="Quantity"
                className="border p-2"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />

              <div className="flex justify-end gap-4 mt-2">
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>

                <button
                  onClick={handleAssign}
                  className="bg-[#786136] text-white px-4 py-2 rounded hover:scale-105"
                >
                  Assign
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
