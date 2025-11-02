#!/usr/bin/env bash
set -euo pipefail

# 0) tuer un next dev éventuel
pkill -f '/next/dist/bin/next .*dev' 2>/dev/null || true

# 1) Tweaks Termux
export NEXT_TELEMETRY_DISABLED=1
export NEXT_DISABLE_SWC_NATIVE=1
export WATCHPACK_POLLING=true
export WATCHPACK_POLLING_INTERVAL=1000
export CHOKIDAR_USEPOLLING=1

# 2) Port/hôte
PORT="${PORT:-3002}"
HOST="${HOST:-0.0.0.0}"

# 3) Premier run (si Next patch tsconfig, il peut sortir)
echo "First run (may patch tsconfig)…"
NODE_OPTIONS="--trace-uncaught --trace-warnings" \
node ./node_modules/next/dist/bin/next dev -p "$PORT" -H "$HOST" 2>&1 | tee .nextdev.log || true

echo
echo "Second run…"
# 4) Second run réel en 'exec'
exec node \
  --trace-uncaught \
  --trace-warnings \
  ./node_modules/next/dist/bin/next dev -p "$PORT" -H "$HOST" 2>&1 | tee -a .nextdev.log
