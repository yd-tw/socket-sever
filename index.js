// index.js
const { Server } = require("socket.io");
const http = require("http");

const PORT = 3001;
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*", // ⚠️ 記得換成你的 Next.js 網站 URL（正式部署）
  },
});

io.on("connection", (socket) => {
  console.log("📡 有用戶連上了");

  // 監聽播放請求
  socket.on("play-request", (payload) => {
    console.log("▶️ 收到播放請求：", payload);

    // 廣播給所有用戶（包含自己）
    io.emit("play", payload);
  });

  socket.on("disconnect", () => {
    console.log("❌ 有用戶離線了");
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Socket.IO server 運行中：http://localhost:${PORT}`);
});
