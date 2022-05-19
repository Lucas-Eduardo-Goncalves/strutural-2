import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

import { api } from "../services/api";

interface UserProps {
  email: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface signInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: signInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: UserProps | undefined;
}

export const AuthContext = createContext({} as AuthContextData); 

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>();
  const isAuthenticated = !!user;

  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['whatsapp-token']);

  useEffect(() => {
    const token = cookies['whatsapp-token'];
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
      setUser({ email: 'eng.franciscodias@gmail.com' });
    } else {
      localStorage.removeItem("whatsapp-token");
    }
  }, []);

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      const { token } = response.data;

      api.defaults.headers.common.authorization = `Bearer ${token.accessToken}`;
      localStorage.setItem("whatsapp-token", token.accessToken);

      setCookie('whatsapp-token', JSON.stringify(token.accessToken), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // one day
      });

      setUser({ email });
      toast.success('Seja bem vindo!')
      history.push('/dashboard');
    } catch (err: any) {
      if(err.response.data.message.message === "error.userNotFound") {
        toast.error("Usuário não encontrado");
      } 

      if(err.response.data.message.message === "error.passwordInvalid") {
        toast.error("Senha incorreta");
      } 
    }
  }

  function signOut() {
    removeCookie("whatsapp-token");
    localStorage.removeItem("whatsapp-token");
    history.push("/");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, signOut }}>
      <Toaster 
        position="top-right"
        reverseOrder={false}
      />
      
      {children}
    </AuthContext.Provider>
  )
}