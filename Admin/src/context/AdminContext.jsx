import React, { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState({ id: "1", name: "Admin", email: "admin@nextute.com" });

  // TODO: Replace with real API
  const logout = async () => {
    await new Promise((r) => setTimeout(r, 500));
    setAdmin(null);
    toast.success("Logged out");
  };

  const value = useMemo(() => ({ admin, setAdmin, logout }), [admin]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export const useAdmin = () => useContext(AdminContext);
export { AdminContext };
