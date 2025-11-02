import { runLLM } from '../lib/llm.js';
export async function createTasks({assets=[]}){
  const llm = await runLLM({system:'Designer', user: JSON.stringify(assets)});
  return {
    accepted: assets.length,
    outputs: assets.map((a,i)=> ({
      name: a.name || `asset_${i+1}`,
      preview: `/preview/${a.name||('asset_'+(i+1))}.png`,
      meta: { seed: Math.floor(Math.random()*100000), license: 'CC0/self-generated' }
    })),
    llm
  };
}
export async function listAssets(){
  return { items: [
    {name:'parchment_page_v2', path:'/assets/textures/parchment_page_v2.png', palette:['#E7D9BA','#3B2F2F','#8E6E53']}
  ] };
}
