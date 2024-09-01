import { FC, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { user_atom, user_login_atom, user_logout_atom } from "./state/user";

export const Login: FC = () => {
  const [name, set_name] = useState("User");
  const [pass, set_pass] = useState("123");
  const [{ mutate, status }] = useAtom(user_login_atom);
  const [{ mutate: user_logout }] = useAtom(user_logout_atom);

  const current_user = useAtomValue(user_atom);

  function render_login_block() {
    return (
      <div className="w-[300px]">
        <div className="bg-neutral-800 px-2 py-1 font-bold">Log in:</div>
        <div className="flex flex-col gap-4 border-2 border-neutral-800 p-4">
          <div className="flex items-center gap-3">
            <div className="flex w-[80px] justify-end">Name:</div>
            <input
              className="min-w-0 border border-transparent bg-neutral-800 p-1 px-2 outline-none focus:border focus:border-sky-600"
              type="text"
              onChange={(e) => set_name(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex w-[80px] justify-end">Pass:</div>
            <input
              className="min-w-0 border border-transparent bg-neutral-800 p-1 px-2 outline-none focus:border focus:border-sky-600"
              type="text"
              onChange={(e) => set_pass(e.target.value)}
              value={pass}
            />
          </div>
          <div className="self-center">
            <button
              onClick={() => {
                mutate({ name, pass });
              }}
              className="border border-sky-800 px-2 py-1 hover:border-sky-600"
            >
              Login
            </button>
          </div>
          {status && <div className="self-center text-green-600">{status}</div>}
        </div>
      </div>
    );
  }

  function render_logout_block() {
    return (
      <div className="w-[300px]">
        <div className="bg-neutral-800 px-2 py-1 font-bold">
          You are logged as:
          <span className="pl-1 text-blue-400">{current_user?.name}</span>
        </div>
        <div className="flex flex-col gap-4 border-2 border-neutral-800 p-4">
          <button
            onClick={() => {
              user_logout();
            }}
            className="border border-sky-800 px-2 py-1 hover:border-sky-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full justify-center pt-4">
      {current_user ? render_logout_block() : render_login_block()}
    </div>
  );
};
