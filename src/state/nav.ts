import { atom } from "jotai";

export enum eNav {
  Chat = "Chat",
  Login = "Login",
  Register = "Register",
  ApiKey = "Api Key",
}

export const nav_atom = atom<eNav>(eNav.Chat);
