# WebSocket Signaling Server

This is a simple WebSocket server implemented in Node.js using TypeScript. It acts as a signaling server for WebRTC connections, facilitating the exchange of session descriptions and ICE candidates between a sender and a receiver.

## Features

- Supports WebSocket connections on port 8080
- Handles sender and receiver roles
- Facilitates the exchange of WebRTC offers, answers, and ICE candidates
- Provides console logging for server events and message routing

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 12.0 or higher recommended)
- npm (usually comes with Node.js)

## Installation

1. Clone this repository or copy the server code into a file named `server.ts`.

2. Navigate to the project directory and install the required dependencies:

   ```
   npm install ws @types/ws typescript ts-node
   ```

3. Create a `tsconfig.json` file in your project root with the following content:

   ```json
   {
     "compilerOptions": {
       "target": "es6",
       "module": "commonjs",
       "strict": true,
       "esModuleInterop": true
     }
   }
   ```

## Usage

To start the server, run:

```
npx ts-node server.ts
```

You should see the message "WebSocket server is listening on port 8080" when the server starts successfully.

## How it works

1. The server listens for WebSocket connections on port 8080.
2. When a client connects, it sends a message to identify itself as either a "sender" or a "receiver".
3. The server then facilitates the exchange of WebRTC signaling messages between the sender and receiver:
   - Offer creation
   - Answer creation
   - ICE candidate exchange
4. The server logs various events and message routing for debugging purposes.

## Message Types

The server handles the following message types:

- `sender`: Identifies a client as the sender
- `receiver`: Identifies a client as the receiver
- `createOffer`: Forwards the offer from sender to receiver
- `createAnswer`: Forwards the answer from receiver to sender
- `iceCandidate`: Exchanges ICE candidates between sender and receiver

## Notes

- This server is designed for development and testing purposes. For production use, consider adding security measures and error handling.
- The server only supports one sender and one receiver at a time. For multiple concurrent connections, you'd need to modify the code to handle multiple pairs.

## Contributing

Contributions to this project are welcome. Please ensure you update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
