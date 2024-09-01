import { useAtomValue } from "jotai";
import { FC } from "react";
import { user_atom } from "./state/user";
import { cn } from "./utils";

enum UserType {
  Guest,
  Normal,
}

export const User: FC = () => {
  const prob_user = useAtomValue(user_atom);

  const user_name = prob_user ? prob_user.name : "Guest";
  const user_type = prob_user ? UserType.Normal : UserType.Guest;

  return (
    <div className="flex h-full items-center gap-1 px-4">
      <span>Hello:</span>{" "}
      <span
        className={cn("font-bold text-neutral-300", {
          ["text-sky-500"]: user_type === UserType.Normal,
        })}
      >
        {user_name}
      </span>
    </div>
  );
};
