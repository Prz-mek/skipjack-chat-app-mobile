import { createContext, useContext, useEffect, useState } from "react";
import AuthApi from "../../api/AuthApi";
import jwt_decode from "jwt-decode";
import { getAccessToken } from "../../api/AuthUtils";
import { IProfile } from "../types";
import { getAsync, getSecure, removeAsync, removeSecure, saveAsync, saveSecure } from "./storageUtils";

function isTokenExpired(token: string) {
  const decodedToken: any = jwt_decode(token);
  const dateNow = new Date();
  if (decodedToken.exp < dateNow.getTime()) {
    return true;
  } else {
    return false;
  }
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: IProfile | null;
  authToken: string | null;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("No AuthContext.Provider found when calling useAuthContext.");
  }
  return context;
};

function AuthProvider(props: any) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<IProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Local methods
  const getAuthFromStorage = async () => {
    const user = await getAsync("user");
    const token = await getSecure("authToken");

    if (token && !isTokenExpired(token)) {
      setUser(user);
      setAuthToken(token);
      setIsAuthenticated(true);
    } else {
      logout();
    }
  }

  // Use Effect

  useEffect(() => { getAuthFromStorage() }, []);

  // Export methods

  const register = async (username: string, email: string, password: string) => {
    return AuthApi.register(username, email, password).then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  const login = async (email: string, password: string) => {
    return AuthApi.login(email, password).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Hello");
      }
    }).then(data => {
      let user: IProfile = {
        id: data.id,
        username: data.username,
        email: data.email,
        imageUri: null,
      };
      setIsAuthenticated(true);
      setUser(user);
      setAuthToken(data.token);
      saveAsync("user", JSON.stringify(user));
      saveSecure("authToken", data.accessToken);
    }).catch(err => console.log(err));
  };

  const logout = async () => {
    setUser(null);
    setAuthToken(null);
    setIsAuthenticated(false);
    removeAsync("user");
    removeSecure("authToken");
  };

  return <AuthContext.Provider value={{ isAuthenticated, user, authToken, login, logout, register }}>{props.children}</AuthContext.Provider>;
}

export { AuthContext, useAuthContext, AuthProvider };
