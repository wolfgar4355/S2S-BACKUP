
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import billingRouter from './routes/billing.js';
import interopRouter from './routes/interop.js';
import payRouter from './routes/pay.js';
import marketRouter from './routes/market.js';
import partyRouter from './routes/party.js';
import pnjRouter from './routes/pnj.js';
import questGenRouter from './routes/quest.js';
import monsterRouter from './routes/monster.js';
import lootRouter from './routes/loot.js';
import authRouter from './routes/auth.js';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

app.get('/', (req,res)=>res.json({ok:true, name:'Sheet2Scene V1.6 API'}));

app.use('/api', billingRouter);
app.use('/api', interopRouter);
app.use('/api', payRouter);
app.use('/api', marketRouter);
app.use('/api', partyRouter);
app.use('/api', pnjRouter);
app.use('/api', questGenRouter);
app.use('/api', monsterRouter);
app.use('/api', lootRouter);
app.use('/api', authRouter);

// Export scene: Foundry-like + UVTT
app.post('/api/export/scene', (req,res)=>{
  const { name='Edited Scene', width=1024, height=768, gridSize=64, doors=[], lights=[], labels=[] } = req.body||{};
  const foundry = {
    name, width, height, grid: gridSize,
    walls: [],
    doors: doors.map((d)=>({ x1:d.x1, y1:d.y1, x2:d.x2, y2:d.y2, door: true })),
    lights: lights.map((l)=>({ x:l.x, y:l.y, dim:l.dim||gridSize*0.6, bright:l.bright||gridSize*0.3 })),
    notes: labels.map((lb)=>({ x:lb.x, y:lb.y, text: lb.name||'Label', cat: lb.cat||'Note', color: lb.color||'#000', size: lb.size||12 })),
  };
  const uvtt = {
    grid_size: gridSize,
    lights: lights.map(l=>({ position:[l.x,l.y], range: l.bright||gridSize*0.3 })),
    doors: doors.map(d=>({ a:[d.x1,d.y1], b:[d.x2,d.y2] })),
    labels
  };
  res.json({ ok:true, foundry, uvtt });
});

const port = process.env.PORT || 8787;
app.listen(port, ()=>console.log('[Sheet2Scene V1.6] API on http://localhost:'+port));
