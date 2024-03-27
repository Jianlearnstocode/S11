"use client";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});
export default function Userprovider({ children }) {
  const router = useRouter();
  const [cookies] = useCookies([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (cookies.email && cookies.token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [cookies.email, cookies.token]);
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a Userprovider");
  }
  return context;
}