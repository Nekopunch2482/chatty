import axios, { AxiosError } from "axios";
import { atom } from "jotai";
import { HOST } from "../utils";
import { atomWithMutation } from "jotai-tanstack-query";
import { atomEffect } from "jotai-effect";

type User = {
  name: string;
};

type LoginCred = {
  name: string;
  pass: string;
};

///////// USER AUTH
const stored_auth_key = localStorage.getItem("AUTH_KEY") ?? "";

axios.defaults.headers.common["auth_key"] = stored_auth_key;

const auth_key = atom(stored_auth_key);

export const auth_key_atom = atom<string, string[], unknown>(
  (get) => {
    get(user_state_changed_effect);
    return get(auth_key);
  },
  (get, set, new_key) => {
    set(auth_key, new_key);
    localStorage.setItem("AUTH_KEY", new_key);
    axios.defaults.headers.common["auth_key"] = new_key;
  },
);

////////// USER
const user = atom<User | undefined>();

export const user_atom = atom((get) => {
  get(user_info_update_effect);
  return get(user);
});

const user_info_update_effect = atomEffect((get, set) => {
  get(auth_key_atom);

  setTimeout(() => {
    axios
      .get(`${HOST}/api/user`)
      .then((res) => set(user, res.data))
      .catch(() => set(user, undefined));
  }, 200);

  return () => {};
});

const user_state_changed_effect = atomEffect((get, set) => {
  const login = get(user_login_atom);
  const logout = get(user_logout_atom);

  if (login.isSuccess) {
    set(auth_key_atom, login.data.data.auth_key);
    login.reset();
  }

  if (logout.isSuccess) {
    set(auth_key_atom, "");
    logout.reset();
  }

  return () => {};
});

export const user_login_atom = atomWithMutation(() => ({
  mutationKey: ["user_login"],
  mutationFn: (cred: LoginCred) => axios.post(`${HOST}/api/login`, cred),
}));

export const user_logout_atom = atomWithMutation(() => ({
  mutationKey: ["user_logout"],
  mutationFn: () => axios.post(`${HOST}/api/logout`),
}));

type RegisterCred = {
  name: string;
  pass: string;
};

export const user_register_atom = atomWithMutation<
  void,
  RegisterCred,
  AxiosError<string>
>((get) => ({
  mutationKey: ["user_register"],
  mutationFn: async (cred: RegisterCred) => {
    return await axios
      .post<LoginCred>(`${HOST}/api/register`, cred)
      .then((res) => {
        const { mutate } = get(user_login_atom);

        setTimeout(() => {
          mutate(res.data);
        }, 100);
      });
  },
}));
