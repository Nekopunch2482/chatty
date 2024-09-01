import { FC } from "react";
import { Nav } from "./Nav";
import { User } from "./User";
import { useAtomValue } from "jotai";
import { eNav, nav_atom } from "./state/nav";
import { Chat } from "./Chat";
import { Login } from "./Login";
import { Register } from "./Register";
import { ApiKey } from "./ApiKey";

export const App: FC = () => {
  const current_nav = useAtomValue(nav_atom);

  function render_content() {
    if (current_nav === eNav.Chat) return <Chat />;
    if (current_nav === eNav.Login) return <Login />;
    if (current_nav === eNav.Register) return <Register />;
    if (current_nav === eNav.ApiKey) return <ApiKey />;
    return <div>NO CONTENT</div>;
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 grid grid-rows-[min-content_1fr_min-content] overflow-x-hidden bg-neutral-900 text-neutral-200">
      <div className="flex justify-between bg-neutral-800">
        <Nav />
        <User />
      </div>
      <div>{render_content()}</div>
      <div>FOOTER</div>
    </div>
  );
};
