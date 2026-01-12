import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Purchases from "./pages/Purchases"
import Transfers from "./pages/Transfers"
import Assignments from "./pages/Assignments"
import Expenditures from "./pages/Expenditures"


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/purchases" element={<Purchases />} />
      <Route path="/transfers" element={<Transfers />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/expenditures" element={<Expenditures />} />

    </Routes>
  )
}


