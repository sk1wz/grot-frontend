import { io, Socket } from "socket.io-client";

const url = "http://localhost:4000";

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

  const subscribe = (socket: Socket) => {
    socket.emit("subscribe", { userId });
  };

  check.on("connect", () => subscribe(check));
  balance.on("connect", () => subscribe(balance));

  return { check, balance };
};
