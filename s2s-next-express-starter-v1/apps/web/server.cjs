const { spawn } = require("child_process");

const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";

const child = spawn(process.execPath, [
  "node_modules/next/dist/bin/next",
  "dev",
  "-p", String(port),
  "-H", host
], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_DISABLE_SWC_NATIVE: "1",
    NEXT_DISABLE_SWC_WASM: "0"
  }
});

child.on("close", code => {
  console.log(`Next.js process exited with code ${code}`);
});
