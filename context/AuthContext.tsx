import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";
import { loginUser, registerUser } from "@/utils/api";
import axios from "axios";

const JWT_KEY = "jwt-key";

type AuthProps = {
  token: string | null;
  userId: number | null;
  onRegister: (email: string, password: string, name: string) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<any>;
  initialized: boolean;
};

interface DecodedToken {
  id: number;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync(JWT_KEY);
      console.log("🚀 ~ loadToken ~ storedToken:", storedToken);
      if (storedToken) {
        processToken(storedToken);
      }

      setInitialized(true);
    };

    loadToken();
  }, []);

  const processToken = (token: string) => {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      setToken(token);
      setUserId(decodedToken.id);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.log("🚀 ~ processToken ~ error", error);
      handleLogout();
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await loginUser(email, password);
    if (result.error) {
      return { error: true, message: result.error };
    }
    const token = result.data;
    processToken(token);
    await SecureStore.setItemAsync(JWT_KEY, token);
    return result;
  };

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    const result = await registerUser(email, password, name);
    console.log("🚀 ~ AuthProvider ~ result:", result);

    if (result.error) {
      return { error: true, message: result.error };
    }

    return result;
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync(JWT_KEY);
    setToken(null);
    setUserId(null);
    axios.defaults.headers.common["Authorization"] = ``;
  };

  const value = {
    initialized,
    token,
    userId,
    onRegister: handleRegister,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
