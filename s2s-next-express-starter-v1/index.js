import express from "express";
import generateImageRouter from "./routes/generate-image.js";

const app = express();
app.use(express.json({ limit: "1mb" }));

app.use("/api", generateImageRouter);

// ...
const port = process.env.PORT_API || 4001;
app.listen(port, () => console.log(`[API] listening on :${port}`));
