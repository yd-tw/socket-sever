const { Server } = require("socket.io");
const http = require("http");

const PORT = 8080;
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("📡 有用戶連接");

  socket.on("get-server-time", (callback) => {
    const serverTime = Date.now();
    callback(serverTime);
  });

  // tone
  socket.on("play-request", () => {
    const serverNow = Date.now();
    const delay = 3000;
    const startAt = serverNow + delay;

    console.log("▶️ 廣播播放指令，播放時間（server）:", new Date(startAt).toLocaleString());

    io.emit("play", { startAt });
  });

  // taw-web
  socket.on("blockOccupied", (data) => {
    console.log("收到佔領事件：", data);

    // 廣播給所有連線的客戶端（包括自己）
    io.emit("blockUpdated", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ 有用戶離線了");
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server 成功運行於：http://localhost:${PORT}`);
});
