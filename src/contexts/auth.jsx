// auth.js
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

// 1. إنشاء Context
const AuthContext = createContext(null);

// Helper functions for localStorage operations
const storageKeys = {
  TOKEN: "token",
  USER: "user",
};

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(storageKeys.USER);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return null;
  }
};

const getStoredToken = () => {
  return localStorage.getItem(storageKeys.TOKEN);
};

const setStoredAuth = (token, user) => {
  try {
    localStorage.setItem(storageKeys.TOKEN, token);
    localStorage.setItem(storageKeys.USER, JSON.stringify(user));
  } catch (error) {
    console.error("Error storing auth data:", error);
  }
};

const clearStoredAuth = () => {
  try {
    localStorage.removeItem(storageKeys.TOKEN);
    localStorage.removeItem(storageKeys.USER);
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
};

// 2. إنشاء مكون Provider (اختياري، لكنه ممارسة جيدة)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user and token from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = getStoredUser();
        const storedToken = getStoredToken();

        // If we have both user and token, restore the session
        if (storedUser && storedToken) {
          setUser(storedUser);
          setToken(storedToken);
        } else if (storedUser || storedToken) {
          // If we have partial data, clear it to avoid inconsistent state
          console.warn("Incomplete auth data found, clearing...");
          clearStoredAuth();
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        clearStoredAuth();
        setUser(null);
        setToken(null);
      } finally {
        setIsLoading(false); //loading is globally
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback((userData) => {
    if (!userData?.token || !userData?.user) {
      console.error("Invalid user data provided to login");
      return false;
    }

    try {
      setStoredAuth(userData.token, userData.user);
      setUser(userData.user);
      setToken(userData.token);
      return true;
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    clearStoredAuth();
    setUser(null);
    setToken(null);
  }, []);

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return !!(user && token);
  }, [user, token]);

  // Get current user info
  const getCurrentUser = useCallback(() => {
    return user;
  }, [user]);

  // Get current token
  const getCurrentToken = useCallback(() => {
    return token;
  }, [token]);

  // Update user data (useful for profile updates)
  const updateUser = useCallback(
    (updatedUser) => {
      if (!updatedUser) return false;

      try {
        setStoredAuth(token, updatedUser);
        setUser(updatedUser);
        return true;
      } catch (error) {
        console.error("Error updating user:", error);
        return false;
      }
    },
    [token]
  );

  // القيمة التي ستتوفر للمستهلكين (value object)
  const contextValue = {
    user,
    token,
    isLoading,
    isAuthenticated: isAuthenticated(),
    login,
    logout,
    getCurrentUser,
    getCurrentToken,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Optional: Export helper functions for use outside of components
export { getStoredUser, getStoredToken, clearStoredAuth };
