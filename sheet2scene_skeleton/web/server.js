import express from "express";

const app = express();
app.use(express.json());

app.get("/healthz", (req, res) => {
  res.json({ status: "ok", service: "web" });
});

app.get("/", (req, res) => {
  res.send(`<html><head><title>Sheet2Scene Beta</title></head>
  <body style="font-family:Arial; margin:40px;">
    <h1>Sheet2Scene — Beta</h1>
    <p>Welcome! Backend is up. Try <code>GET /healthz</code> and <code>POST /agents/jobs</code> (via orchestrator).</p>
  </body></html>`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("web up on port", port);
});
