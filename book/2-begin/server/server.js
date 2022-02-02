const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("我的 express 伺服器");
});

server.listen(3000, () => {
  console.log("Port 3000 準備就緒！"); // eslint-disable-line no-console
});
