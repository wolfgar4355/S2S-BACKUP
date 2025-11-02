import fs from 'fs'; import path from 'path'; import { runLLM } from '../lib/llm.js';
export async function handleBrief({goals='', audience='', constraints=''}){
  const system = fs.readFileSync(path.join(process.cwd(),'prompts','DA_system.txt'),'utf-8');
  const user = `GOALS: ${goals}\nAUDIENCE: ${audience}\nCONSTRAINTS: ${constraints}`;
  const llm = await runLLM({system, user});
  return {
    directions:[
      {name:'Arcane Minimal', palette:['#B48A3C','#0F1115','#EAEFF5']},
      {name:'Scroll & Runic', palette:['#8E6E53','#161B22','#C8D1DB']},
      {name:'Ink & Brass', palette:['#946F2F','#0F1115','#EAEFF5']}
    ],
    tokensDelta:{ palette:{ accent:{ '500':'#CC2020' } } },
    llm
  };
}
export async function getTokens(){
  const p = path.join(process.cwd(),'assets','tokens','design_tokens.json');
  return JSON.parse(fs.readFileSync(p,'utf-8'));
}
