import { FC } from "react";
import { cn } from "./utils";
import { eNav, nav_atom } from "./state/nav";
import { useAtom } from "jotai";

const nav = [eNav.Chat, eNav.Register, eNav.Login, eNav.ApiKey];

export const Nav: FC = () => {
  const [current_nav, set_current_nav] = useAtom(nav_atom);

  return (
    <div className="flex select-none gap-4 p-1 text-neutral-300">
      {nav.map((n, i) => (
        <div
          key={i}
          onClick={() => {
            set_current_nav(n);
          }}
          className={cn(
            "cursor-pointer border-pink-900 p-1 transition-all hover:border-b-2 hover:text-neutral-200",
            {
              ["border-b-2 border-pink-500"]: n === current_nav,
            },
          )}
        >
          {n}
        </div>
      ))}
    </div>
  );
};
