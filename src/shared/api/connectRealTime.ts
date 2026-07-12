import { io, Socket } from "socket.io-client";
import { apiOrigin } from "./config";

type Sockets = {
  check: Socket;
  balance: Socket;
};

export const connectRealtime = (userId: string): Sockets => {
  const common = {
    withCredentials: true,
    query: { userId },
  };

  const check = io(`${apiOrigin}/check`, common);
  const balance = io(`${apiOrigin}/balance`, common);

  check.emit("subscribe", { userId });
  balance.emit("subscribe", { userId });

  return { check, balance };
};
