// Define the logging functions
function logProxyRequest(proxyReq, req, res) {
  console.log("Proxy request:", req.method, req.url);
}

function logProxyResponse(proxyRes, req, res) {
  console.log("Proxy response:", proxyRes.statusCode);
}

// Export the proxy configuration with the logging functions
module.exports = {
  "/api/": {
    target: "http://127.0.0.1:3000/",
    // target: "https://lms-be.manazel-alabrar.com/",
    secure: false,
    changeOrigin: true,
    onProxyReq: logProxyRequest,
    onProxyRes: logProxyResponse,
  },
  "/files/": {
    target: "http://127.0.0.1:3000/",
    // target: "https://lms-be.manazel-alabrar.com/",
    secure: false,
    changeOrigin: true,
    onProxyReq: logProxyRequest,
    onProxyRes: logProxyResponse,
  },
  "/uploads": {
    // target: "http://127.0.0.1:1337",
    target: "https://lms-be.manazel-alabrar.com/",
    secure: false,
    changeOrigin: true,
    onProxyReq: logProxyRequest,
    onProxyRes: logProxyResponse,
  },
};
