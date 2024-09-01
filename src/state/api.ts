import axios from "axios";
import { atom } from "jotai";

const stored_api_key = localStorage.getItem("API_KEY") ?? "";

axios.defaults.headers.common["api_key"] = stored_api_key;

const api_key = atom(stored_api_key);

export const api_key_atom = atom<string, string[], unknown>(
  (get) => get(api_key),
  (get, set, new_key) => {
    set(api_key, new_key);
    localStorage.setItem("API_KEY", new_key);
    axios.defaults.headers.common["api_key"] = new_key;
  },
);
