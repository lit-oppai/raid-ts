// TODO: 后端升级到socket.io 4.0.0后，需要修改socket.io-client版本为4.0.0
import io from "socket.io-client";

const protocol = document.location.protocol;
const wsProtocol = protocol === "https:" ? "wss:" : "ws:";
const openApiDevIP = import.meta.env.VITE_OPEN_API_DEV_IP || document.location.hostname;
const openApiDevPort = import.meta.env.VITE_OPEN_API_DEV_PORT || document.location.port;
export const baseURL = `${openApiDevIP}:${openApiDevPort}`;
const wsURL = `${wsProtocol}//${baseURL}`;

export const socket = io(wsURL, {
    // transports: ["websocket", "polling"],
    transports: ["websocket"],
    path: "/v2/message_bus/socket.io",
    reconnection: false,
    autoConnect: true,
})

export {}
