import { createContext, useContext, useEffect, useState } from "react";
import AuthApi from "../../api/AuthApi";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { getAccessToken } from "../../api/AuthUtils";

function isTokenExpired(token: string) {
  const decodedToken: any = jwt_decode(token);
  const dateNow = new Date();
  if (decodedToken.exp < dateNow.getTime()) {
    return true;
  }
  return false;
}

async function saveSecure(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getSecure(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

async function removeSecure(key: string) {
  await SecureStore.deleteItemAsync(key);
}

async function saveAsync(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    // saving error
  }
}

async function getAsync(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (err) {
    return null;
  }
}

async function removeAsync(key: string) {
  await AsyncStorage.removeItem(key);
}

export interface User {
  id: string;
  username: string;
  email: string;
}

interface IAuthContext {
  user: User | null;
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
  const [authToken, setAuthToken] = useState<string | null>(getAccessToken());
  const [user, setUser] = useState<User | null>({
    id: '631ec12dbbc16dc34d100451',
    username: 'Ala',
    email: "ala@ala.com"
  });

  // Local methods
  const getAuthFromStorage = async () => {
    const user = await getAsync("user");
    const token = await getSecure("authToken");

    if (token && !isTokenExpired(token)) {
      setUser(user);
      setAuthToken(token);
    } else {
      //logout();
    }
  }

  // Use Effect

  //useEffect(() => { getAuthFromStorage() }, []);

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
      }
      throw new Error("Hello");
    }).then(data => {
      let user: User = {
        id: data.id,
        username: data.username,
        email: data.email
      };
      setUser(user);
      setAuthToken(data.token);
      saveAsync("user", JSON.stringify(user));
      console.log(data.accessToken);
      saveSecure("authToken", data.accessToken);
    }).catch(err => console.log(err));
  };

  const logout = async () => {
    setUser(null);
    setAuthToken(null)
    removeAsync("user");
    removeSecure("authToken");
  };

  return <AuthContext.Provider value={{ user, authToken, login, logout, register }}>{props.children}</AuthContext.Provider>;
}

export { AuthContext, useAuthContext, AuthProvider };