import React, { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";

import Cookie from "js-cookie";

import { api } from "../../services/api";

import type { 
  AuthProviderProps, 
  ISignInResponse, 
  IUserProps, 
  signInCredentials,
} from "./types";

interface AuthContextData {
  signIn: (credentials: signInCredentials) => Promise<void>;
  signOut: () => void;
  user: IUserProps | undefined;
}

export const AuthContext = createContext({} as AuthContextData); 

export function AuthProvider({ children }: AuthProviderProps) {
  const history = useHistory();

  const [user, setUser] = useState<IUserProps | undefined>(() => {
    const userCookie = Cookie.get("strutural-user");

    if(userCookie) return JSON.parse(userCookie);
    return undefined;
  });

  useEffect(() => {
    const token = Cookie.get('strutural-token');
    if (token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;
    }
  }, []);

  async function signIn({ email, password }) {
    try {
      const { data: { token, user } } = await api.post<ISignInResponse>('/login', {
        email,
        password,
      });
      
      console.log({ token, user })

      api.defaults.headers.common.authorization = `Bearer ${token.accessToken}`;

      Cookie.set('strutural-token', token.accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // one day
      });

      Cookie.set('strutural-user', JSON.stringify(user), {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // one day
      });

      setUser(user);
      toast.success(`Seja bem vindo, ${user.name}!`)

      history.push('/admin/usuarios');
    } catch (err: any) {
      if(err.response.data.message.message === "error.userNotFound") {
        toast.error("Usuário não encontrado");
      } 

      if(err.response.data.message.message === "error.passwordInvalid") {
        toast.error("Senha incorreta");
      } 
    };
  }

  function signOut() {
    Cookie.remove("strutural-token");
    history.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      <Toaster 
        position="top-right"
        reverseOrder={false}
      />
      
      {children}
    </AuthContext.Provider>
  );
}
