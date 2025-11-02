set -euo pipefail
mkdir -p .next .next/server .next/static
[ -f .next/BUILD_ID ] || date +%s > .next/BUILD_ID
cat > .next/prerender-manifest.json <<'JSON'
{ "version":4, "routes":{}, "dynamicRoutes":{}, "preview":{
  "previewModeId":"dev","previewModeSigningKey":"dev","previewModeEncryptionKey":"dev"},
  "notFoundRoutes":[] }
JSON
cat > .next/routes-manifest.json <<'JSON'
{"version":5,"basePath":"","pages404":true,"trailingSlash":false,
 "staticRoutes":[],"dynamicRoutes":[],"dataRoutes":[],"i18n":null,
 "rewrites":{"beforeFiles":[],"afterFiles":[],"fallback":[]},
 "headers":[],"redirects":[]}
JSON
cat > .next/server/pages-manifest.json <<'JSON'
{"pages":{}}
JSON
cat > .next/server/font-manifest.json <<'JSON'
{"pages":{},"app":{},"appUsingSizeAdjust":false,"pagesUsingSizeAdjust":false}
JSON
echo "[fix] Manifests OK. BUILD_ID: $(cat .next/BUILD_ID)"
