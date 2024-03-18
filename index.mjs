import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(
  "/proxy/:realUrl*",
  (req, res, next) => {
    const realUrl = req.params.realUrl + (req.params[0] || "");
    req.url = realUrl;
    next();
  },
  createProxyMiddleware({
    target: "https://",
    router: function (req) {
      return req.url;
    },
    changeOrigin: true,
    pathRewrite: function (path, req) {
      return "/";
    },
    logLevel: "debug",
  })
);

app.listen(3000);
