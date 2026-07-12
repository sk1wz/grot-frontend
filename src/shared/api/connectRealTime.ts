import { io, Socket } from "socket.io-client";

const url = "http://api.ivatracker.ru";
type Sockets = {
  check: Socket;
  balance: Socket;
};

export const connectRealtime = (userId: string): Sockets => {
  const common = {
    withCredentials: true,
    query: { userId },
  };

  const check = io(`${url}/check`, common);
  const balance = io(`${url}/balance`, common);

  check.emit("subscribe", { userId });
  balance.emit("subscribe", { userId });

  return { check, balance };
};
