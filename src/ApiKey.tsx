import { FC, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { api_key_atom } from "./state/api";
import axios from "axios";
import { cn, HOST } from "./utils";

enum ApiStatus {
  Allow = "Access allowed",
  Deny = "Access denied",
  Error = "Server Error",
}

export const ApiKey: FC = () => {
  const [key, set_key] = useAtom(api_key_atom);
  const [input, set_input] = useState(key);
  const [status, set_status] = useState(ApiStatus.Deny);

  useEffect(() => {
    axios
      .get(`${HOST}/api`)
      .then(() => set_status(ApiStatus.Allow))
      .catch((res) =>
        set_status(res.status === 401 ? ApiStatus.Deny : ApiStatus.Error),
      );
  }, [key]);

  return (
    <div className="flex h-full w-full justify-center pt-4">
      <div className="flex w-[333px] flex-col gap-4">
        <input
          className="min-w-0 border border-transparent bg-neutral-800 p-1 px-2 outline-none focus:border focus:border-sky-600"
          type="text"
          value={input}
          onChange={(e) => {
            set_input(e.target.value);
          }}
        />
        <div
          className={cn("self-center text-xl text-red-600", {
            ["text-green-600"]: status === ApiStatus.Allow,
          })}
        >
          {status}
        </div>
        <div className="self-center">
          <button
            onClick={() => set_key(input)}
            className="border border-sky-800 px-2 py-1 hover:border-sky-600"
          >
            Set Key
          </button>
        </div>
      </div>
    </div>
  );
};
