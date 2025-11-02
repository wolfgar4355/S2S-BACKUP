const http = require('http'); const HOST=process.env.HOST||'127.0.0.1'; const PORT=parseInt(process.env.PORT||'4001',10);
const { generateQuest } = require('./modules/quests');
const { buildPrompt } = require('./modules/characters/prompt.cjs');
const { attachVtt, ROOMS } = require('./vtt.cjs');

const server=http.createServer(async(req,res)=>{
  if(req.method==='GET'&&req.url==='/api/health'){ res.writeHead(200,{'content-type':'application/json'}); return res.end(JSON.stringify({ok:true,service:'s2s-server'})); }

  if(req.method==='POST'&&req.url==='/generate'){
    let body=''; req.on('data',c=>body+=c); req.on('end',()=>{ try{
      const data=JSON.parse(body||'{}');
      const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='480'><rect width='100%' height='100%' fill='#222'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#fff' font-size='22' font-family='monospace'>${String(data.prompt||'No prompt').replace(/</g,'&lt;').slice(0,120)}</text></svg>`;
      const b64=Buffer.from(svg).toString('base64'); const imageUrl=`data:image/svg+xml;base64,${b64}`;
      res.writeHead(200,{'content-type':'application/json'}); return res.end(JSON.stringify({ok:true,imageUrl}));
    }catch(e){ res.writeHead(400,{'content-type':'application/json'}); return res.end(JSON.stringify({ok:false,error:String(e)})); } });
    return;
  }

  if(req.method==='POST'&&req.url==='/generate-quest'){
    let body=''; req.on('data',c=>body+=c); req.on('end',()=>{ try{
      const data=JSON.parse(body||'{}'); const result = generateQuest(data||{});
      res.writeHead(200,{'content-type':'application/json'}); return res.end(JSON.stringify(result));
    }catch(e){ res.writeHead(400,{'content-type':'application/json'}); return res.end(JSON.stringify({ok:false,error:String(e)})); } });
    return;
  }

  
  if(req.method==='POST'&&req.url==='/render-character'){
    let body=''; req.on('data',c=>body+=c); req.on('end',()=>{
      try{
        const sheet = JSON.parse(body||'{}');
        const prompt = buildPrompt(sheet);
        const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='900' height='540'>
          <rect width='100%' height='100%' fill='#111'/>
          <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#fff'
                font-size='18' font-family='monospace'>${prompt.replace(/</g,'&lt;').slice(0,280)}</text>
        </svg>`;
        const imageUrl=`data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
        res.writeHead(200,{'content-type':'application/json'});
        return res.end(JSON.stringify({ ok:true, prompt, imageUrl }));
      }catch(e){
        res.writeHead(400,{'content-type':'application/json'});
        return res.end(JSON.stringify({ ok:false, error:String(e) }));
      }
    }); return;
  }

  // Create room (returns id) - simple
  if(req.method==='POST' && req.url==='/vtt/room'){
    const { randomUUID } = require('crypto');
    const id = randomUUID().slice(0,8);
    if(!ROOMS.has(id)) ROOMS.set(id, { state: { scene:{id:'default',name:'Scene',bgUrl:'',grid:{size:50,visible:true}}, tokens:{}, fog:{enabled:false,revealed:[]}, turn:{order:[],index:0}}, clients: new Set() });
    res.writeHead(200,{'content-type':'application/json'}); return res.end(JSON.stringify({ ok:true, id }));
  }

  // Get snapshot
  if(req.method==='GET' && req.url.startsWith('/vtt/room/')){
    const id = req.url.split('/').pop();
    const room = ROOMS.get(id);
    res.writeHead(200,{'content-type':'application/json'}); return res.end(JSON.stringify({ ok: !!room, state: room?.state || null }));
  }
res.writeHead(404,{'content-type':'text/plain'}); res.end('Not found');
});
attachVtt(server, '/vtt');
server.listen(PORT,HOST,()=>console.log(`[s2s-server] listening on http://${HOST}:${PORT}`));
