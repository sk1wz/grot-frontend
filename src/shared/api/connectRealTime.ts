import { io, Socket } from "socket.io-client";

const url = "http://localhost:4000";
type Sockets = {
  check: Socket;
  balance: Socket;
  notifications: Socket;
};

export const connectRealtime = (userId: string): Sockets => {
  const common = {
    withCredentials: true,
    query: { userId },
  };

  const check = io(`${url}/check`, common);
  const balance = io(`${url}/balance`, common);
  const notifications = io(`${url}/notifications`, common);

  check.emit("subscribe", { userId });
  balance.emit("subscribe", { userId });
  notifications.emit("subscribe", { userId });

  return { check, balance, notifications };
};
