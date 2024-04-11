
import { toast } from "react-toastify";
import Toastify from "../../components/Toastify";
import Sidebar from "../../components/Sidebar";

import { useEffect } from "react";

import useAuth from "../../hooks/useAuth";

export default function Dashboards() {
  const { logout } = useAuth();
  const notify = () => toast('Seja bem-vindo ao sistema!')

  async function handleLogout() {
    await logout()
  }


  return (
    <div>
      <Sidebar />
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Sair</button>
      <Toastify />
    </div>
  );
}