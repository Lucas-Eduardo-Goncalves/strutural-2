import { ReactNode } from "react";

export interface IUserProps {
  avatar: string | null;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  role: string;
  updatedAt: string;
}

export interface ITokenProps {
  accessToken: string;
  expiresIn: number;
}

export interface ISignInResponse {
  user: IUserProps;
  token: ITokenProps;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface signInCredentials {
  email: string;
  password: string;
}