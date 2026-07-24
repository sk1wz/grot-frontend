import { io, Socket } from "socket.io-client";
import { baseURL } from "./config";

type Sockets = {
  check: Socket;
  balance: Socket;
};

export const connectRealtime = (userId: string): Sockets => {
  const common = {
    withCredentials: true,
    query: { userId },
  };

  const check = io(`${baseURL}/check`, common);
  const balance = io(`${baseURL}/balance`, common);

  const subscribe = (socket: Socket) => {
    socket.emit("subscribe", { userId });
  };

  check.on("connect", () => subscribe(check));
  balance.on("connect", () => subscribe(balance));

  return { check, balance };
};
