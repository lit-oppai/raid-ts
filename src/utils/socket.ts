import io from "socket.io-client";

const wsProtocol = location.protocol === "https:" ? "wss:" : "ws:";
const wsURL = `${wsProtocol}//${document.location.hostname}`;
const socket = io(wsURL, {
    transports: ["websocket", "polling"],
    path: "/v2/message_bus/socket.io",
});

// Function:
// Listen to device status
export default socket
