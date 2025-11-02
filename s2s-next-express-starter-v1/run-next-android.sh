#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

cd ~/s2s/s2s-next-express-starter-v1
for d in apps/web web; do
  if [ -f "$d/package.json" ]; then WEB="$d"; break; fi
done
if [ -z "${WEB:-}" ]; then
  echo "❌ Dossier web introuvable"; pwd; ls -la; exit 1
fi
cd "$WEB"; echo "➡️  Web dir: $PWD"

pkill -f "next dev" 2>/dev/null || true
rm -rf node_modules .next package-lock.json

npm install --save-exact --workspaces=false \
  next@13.5.6 react@18.2.0 react-dom@18.2.0 @next/swc-wasm-nodejs@13.5.6

echo "Next version = $(node -p "require('./node_modules/next/package.json').version")"
echo "SWC wasm     = $(node -p "require('./node_modules/@next/swc-wasm-nodejs/package.json').version")"

export NEXT_DISABLE_SWC_NATIVE=1
export NEXT_DISABLE_SWC_WASM=0
export NEXT_TELEMETRY_DISABLED=1

exec node ./node_modules/next/dist/bin/next dev -H 0.0.0.0 -p 3333
