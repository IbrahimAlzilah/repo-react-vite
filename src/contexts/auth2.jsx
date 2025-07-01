// // auth.js
// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null); // set to null if not logged in

//   const login = (username) => setUser({ name: username });
//   const logout = () => setUser(null);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

// ===================== Store Auth Token localStorage =====================
// contexts/auth.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user"));

  // Load user from localStorage on first mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save to localStorage on login
  const login = (userData) => {
    // localStorage.setItem("user", JSON.stringify(userData));
    // setUser(userData);
    // console.log(JSON.stringify(userData.user.username));
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData.user));
  };

  // Clear localStorage on logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
