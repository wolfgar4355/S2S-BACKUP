export async function runLLM({system, user, model='stub'}){
  // Stubbed LLM: returns deterministic suggestions
  const now = new Date().toISOString();
  return {
    model, now,
    summary: `Stub response for: ${user?.slice(0,60) || ''}...`,
    suggestions:[
      "Keep AA contrast and avoid third-party IP",
      "Deliver tokens as JSON and assets with meta.json"
    ]
  };
}
