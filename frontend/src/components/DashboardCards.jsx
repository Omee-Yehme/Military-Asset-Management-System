import { useEffect, useState } from "react";
import api from "../api/axios";

export default function DashboardCards() {
    const [assets, setAssets] = useState([]);
    const [bases, setBases] = useState([]);
    const [filters, setFilters] = useState({
        date: "",
        baseId: "",
        equipmentType: "",
    });

    const user = JSON.parse(localStorage.getItem("user"));

    // Fetch all bases for dropdown
    useEffect(() => {
        const fetchBases = async () => {
            try {
                const res = await api.get("/bases"); // your API to get base list
                setBases(res.data); // assuming [{_id, name}, ...]
            } catch (err) {
                console.error(err);
            }
        };
        fetchBases();
    }, []);

    // Fetch assets with filters
    const fetchAssets = async () => {
        try {
            const params = {};

            if (filters.date) params.date = filters.date;
            if (filters.baseId) params.baseId = filters.baseId;
            if (filters.equipmentType) params.equipmentType = filters.equipmentType;

            const response = await api.get("/dashboard", { params });
            setAssets(response.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    const handleDelete = async (assetId) => {
        if (!window.confirm("Are you sure you want to delete this asset?")) return;

        try {
            await api.delete(`/dashboard/${assetId}`);
            setAssets((prev) => prev.filter((a) => a.assetId !== assetId));
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Delete failed");
        }
    };



    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAssets();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-4">
            {/* Filters */}
            <div className="mb-6 flex justify-end mr-[10%] flex-wrap gap-4 items-end">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={filters.date}
                        onChange={handleFilterChange}
                        className="mt-1 rounded border-gray-300 p-2"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700">Base</label>
                    <select
                        name="baseId"
                        value={filters.baseId}
                        onChange={handleFilterChange}
                        className="mt-1 rounded border-gray-300 p-2"
                    >
                        <option value="">All Bases</option>
                        {bases.map((b) => (
                            <option key={b._id} value={b._id}>{b.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Equipment Type</label>
                    <select
                        name="equipmentType"
                        value={filters.equipmentType}
                        onChange={handleFilterChange}
                        className="mt-1 rounded border-gray-300 p-2"
                    >
                        <option value="">All Types</option>
                        <option value="Weapon">Weapon</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Ammo">Ammo</option>
                    </select>
                </div>

                <button
                    onClick={fetchAssets}
                    className="bg-[#737a45] text-white px-4 py-2 rounded-full hover:bg-[#4B5320] transition"
                >
                    Apply Filters
                </button>
            </div>

            {/* Cards */}
            <div className="grid gap-6 mx-[200px] sm:grid-cols-2 lg:grid-cols-3">
                {assets.map((item, index) => (
                    <div
                        key={index}
                        className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-md shadow-[#4B5320] hover:shadow-lg transition"
                    >

                        {user?.role === "Admin" && (
                            <button
                                onClick={() => handleDelete(item.assetId)}
                                className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-lg"
                                title="Delete Asset"
                            >
                                🗑
                            </button>
                        )}

                        <div className="mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {item.assetName}
                            </h2>
                            <span className="text-sm text-gray-500">{item.type}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                            <Stat label="Opening" value={item.openingBalance} />
                            <Stat label="Purchases" value={item.purchases} />
                            <Stat label="Assigned" value={item.assigned} />
                            <Stat label="Expended" value={item.expended} />
                        </div>

                        <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-100 px-4 py-2">
                            <span className="text-sm font-medium text-gray-600">
                                Closing Balance
                            </span>
                            <span
                                className={`text-lg font-bold ${item.closingBalance < 0
                                    ? "text-red-600"
                                    : "text-green-600"
                                    }`}
                            >
                                {item.closingBalance}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div className="flex justify-between">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-800 px-3">{value}</span>
        </div>
    );
}
