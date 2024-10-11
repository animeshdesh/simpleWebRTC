import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: WebSocket | null = null;
let receiverSocket: WebSocket | null = null;

wss.on("listening", () => {
  console.log("WebSocket server is listening on port 8080");
});

wss.on("connection", function connection(ws) {
  console.log("New client connected");

  ws.on("error", console.error);

  ws.on("message", function message(data: any) {
    const message = JSON.parse(data);
    if (message.type === "sender") {
      senderSocket = ws;
      console.log("Sender connected");
    } else if (message.type === "receiver") {
      receiverSocket = ws;
      console.log("Receiver connected");
    } else if (message.type === "createOffer") {
      if (ws !== senderSocket) {
        return;
      }
      console.log("Forwarding create offer to receiver");
      receiverSocket?.send(
        JSON.stringify({ type: "createOffer", sdp: message.sdp })
      );
    } else if (message.type === "createAnswer") {
      if (ws !== receiverSocket) {
        return;
      }
      console.log("Forwarding create answer to sender");
      senderSocket?.send(
        JSON.stringify({ type: "createAnswer", sdp: message.sdp })
      );
    } else if (message.type === "iceCandidate") {
      if (ws === senderSocket) {
        console.log("Forwarding ICE candidate from sender to receiver");
        receiverSocket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: message.candidate })
        );
      } else if (ws === receiverSocket) {
        console.log("Forwarding ICE candidate from receiver to sender");
        senderSocket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: message.candidate })
        );
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    if (ws === senderSocket) {
      senderSocket = null;
    } else if (ws === receiverSocket) {
      receiverSocket = null;
    }
  });

  ws.send("Connected to WebSocket server");
});

wss.on("close", () => {
  console.log("WebSocket server closed");
});
