process.env.NEXT_DISABLE_SWC_NATIVE = '1';
process.env.NEXT_DISABLE_TURBOPACK  = '1';
process.env.NEXT_TELEMETRY_DISABLED = '1';
console.log('[dev] forcing SWC WASM…');
require('next/dist/bin/next');
