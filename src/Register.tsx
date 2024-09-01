import { FC, useState } from "react";
import { useAtom } from "jotai";
import { user_register_atom } from "./state/user";

export const Register: FC = () => {
  const [name, set_name] = useState("User");
  const [pass, set_pass] = useState("123");
  const [{ mutate, error, status }] = useAtom(user_register_atom);

  return (
    <div className="flex h-full w-full justify-center pt-4">
      <div className="w-[300px]">
        <div className="bg-neutral-800 px-2 py-1 font-bold">
          Register new user
        </div>
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
              Register
            </button>
          </div>
          {(error && (
            <div className="self-center text-rose-600">
              {error.response?.data}
            </div>
          )) ||
            (status !== "idle" && (
              <div className="self-center text-green-600">{status}</div>
            ))}
        </div>
      </div>
    </div>
  );
};
