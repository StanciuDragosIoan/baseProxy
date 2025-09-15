// server.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Proxy all requests to / to www.test.com
app.use(
  "/",
  createProxyMiddleware({
    target: "https://chatgpt.com/",
    changeOrigin: true,
    pathRewrite: {
      "^/": "/", // Optional: rewrite path if needed
    },
  })
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
