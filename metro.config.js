const fs = require("fs");
const path = require("path");
const httpProxy = require("http-proxy");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

function loadApiTarget() {
  if (process.env.API_URL) return process.env.API_URL;
  try {
    const env = fs.readFileSync(path.join(__dirname, ".env"), "utf8");
    const line = env.split("\n").find((l) => l.startsWith("API_URL="));
    if (line) return line.slice("API_URL=".length).trim();
  } catch {
    // .env optional
  }
  return "http://localhost:8000";
}

const apiTarget = loadApiTarget();
const proxy = httpProxy.createProxyServer({});

const config = getDefaultConfig(__dirname);

config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (req.url?.startsWith("/api")) {
        req.url = req.url.replace(/^\/api/, "") || "/";
        proxy.web(
          req,
          res,
          { target: apiTarget, changeOrigin: true },
          (err) => {
            if (err && !res.headersSent) {
              res.writeHead(502, { "Content-Type": "text/plain" });
              res.end("API proxy error");
            }
          },
        );
        return;
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = withNativeWind(config, { input: "./global.css" });
