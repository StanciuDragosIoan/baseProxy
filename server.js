const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// ✅ Add CORS headers BEFORE proxy
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// 🔁 Proxy setup
app.use(
  "/",
  createProxyMiddleware({
    target: "https://chat.openai.com", // or your target domain
    changeOrigin: true,
    secure: false, // helpful if SSL certs cause issues
    pathRewrite: {
      "^/": "/", // optional
    },
  })
);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
