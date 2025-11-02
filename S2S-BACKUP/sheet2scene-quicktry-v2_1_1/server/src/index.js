import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { quotaGuard } from './middleware/quota.js';

import pnjRouter from './routes/pnj.js';
import questRouter from './routes/quest.js';
import monsterRouter from './routes/monster.js';
import lootRouter from './routes/loot.js';
import exportRouter from './routes/exporter.js';
import helpRouter from './routes/help.js';
import worldRouter from './routes/world.js';
import refsRouter from './routes/refs.js';
import partyRouter from './routes/party.js';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit:'10mb' }));

// Server-side quota guard (NPC = 5/day) on generator endpoints
app.use('/api', quotaGuard);

app.use('/api', pnjRouter);
app.use('/api', questRouter);
app.use('/api', monsterRouter);
app.use('/api', lootRouter);
app.use('/api', exportRouter);
app.use('/api', helpRouter);
app.use('/api', worldRouter);
app.use('/api', refsRouter);
app.use('/api', partyRouter);

app.get('/', (req,res)=>res.json({ ok:true, name:'Sheet2Scene QuickTry v2.1.1' }));
const port = process.env.PORT || 8787;
app.listen(port, ()=>console.log('[QuickTry] API on http://localhost:'+port));
