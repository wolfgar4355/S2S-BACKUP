#!/usr/bin/env bash
set -euo pipefail

# 0) Aller dans le bon dossier
cd ~/s2s/s2s-next-express-starter-v1/apps/web

# 1) Stop + nettoyage
pkill -f "node.*next" 2>/dev/null || true
rm -rf .next .nextdev* next.*.log

# 2) Supprimer tout pages/index.* éventuel (racine ou src), en ignorant node_modules
find . -path './node_modules' -prune -o -regex '.*/\(src/\)\?pages/index\.\(js\|jsx\|ts\|tsx\)$' -print -exec rm -f {} +

# 3) S’assurer d’avoir une page d’accueil app router
if [ ! -f app/page.tsx ]; then
  mkdir -p app
  cat > app/page.tsx <<'EOT'
export default function Home() {
  return (
    <main style={{padding:16,fontFamily:'system-ui'}}>
      <h1>Hello 👋</h1>
      <p>Next + App Router (app/page.tsx)</p>
    </main>
  );
}
EOT
fi

# 4) Scrips npm robustes (dev/build/start)
node -e "let p=require('./package.json');p.scripts=p.scripts||{};p.scripts.dev='next dev -p 3030 -H 0.0.0.0';p.scripts.build='next build';p.scripts.start='next start -p 3030 -H 0.0.0.0';require('fs').writeFileSync('package.json',JSON.stringify(p,null,2));console.log('scripts OK');"

# 5) Build (doit finir sans erreur)
npm run build

# 6) Lancer en DEV, visible sur le LAN
export HOST=0.0.0.0
export PORT=3030
npm run dev
