import { FC, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { HOST } from "./utils";
import { useAtomValue } from "jotai";
import { api_key_atom } from "./state/api";
import { auth_key_atom } from "./state/user";

type ChatMessage = {
  author: string;
  message: string;
};

export const Chat: FC = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Array<ChatMessage>>([]);
  const socket_ref = useRef<Socket | null>(null);
  const chat_window_ref = useRef<HTMLDivElement | null>(null);
  const chat_window_scroll_ref = useRef<HTMLDivElement | null>(null);
  const api_key = useAtomValue(api_key_atom);
  const auth_key = useAtomValue(auth_key_atom);

  useEffect(() => {
    const socket: Socket = io(HOST, {
      path: "/api/chat",
      query: {
        api_key: api_key,
        auth_key: auth_key,
      },
    });

    socket_ref.current = socket;

    socket.on("CHAT_MESSAGE", (list: ChatMessage[]) => {
      setChat((prev) => [...prev, ...list].slice(-50));
    });

    socket.on("SESSION_EXPIRED", () => {
      // alert("SESSION_EXPIRED");
    });

    socket.on("connect_error", (e) => {
      console.error("Connection error:", e.message);
    });

    return () => {
      socket.disconnect();
      socket_ref.current = null;
    };
  }, [api_key, auth_key]);

  useEffect(() => {
    scroll_to_bottom("smooth");
  }, [chat]);

  useEffect(() => {
    setTimeout(() => {
      scroll_to_bottom("instant");
    }, 50);
  }, []);

  function scroll_to_bottom(behavior: "smooth" | "instant") {
    if (!chat_window_ref.current) return;

    const chat_window_height = Number(
      window.getComputedStyle(chat_window_ref.current).height.slice(0, -2),
    );

    if (!chat_window_scroll_ref.current) return;
    chat_window_scroll_ref.current.scrollTo({
      behavior,
      top: chat_window_height,
    });
  }

  return (
    <div className="flex h-full w-full justify-center pt-4">
      <div className="flex w-[80%] flex-col gap-3">
        <div
          ref={chat_window_scroll_ref}
          className="relative flex h-[400px] flex-col gap-1 overflow-y-scroll border border-neutral-500 p-3"
        >
          <div ref={chat_window_ref} className="relative">
            {chat.map((msg, index) => (
              <div className="flex gap-2" key={index}>
                <span className="text-sky-500">{`${msg.author}:`}</span>
                <span>{msg.message}</span>
              </div>
            ))}
          </div>
        </div>

        <input
          className="min-w-0 border border-transparent bg-neutral-800 p-1 px-2 outline-none focus:border focus:border-sky-600"
          type="text"
          value={message}
          onKeyDown={(e) => {
            if (!message.trim()) return;
            if (!socket_ref.current) return;

            if (e.code == "Enter") {
              socket_ref.current.emit("CHAT_MESSAGE", message);
              setMessage("");
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="w-[150px] border border-sky-800 px-2 py-1 hover:border-sky-600"
          onClick={() => {
            if (!message.trim()) return;
            if (!socket_ref.current) return;

            socket_ref.current.emit("CHAT_MESSAGE", message);
            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
