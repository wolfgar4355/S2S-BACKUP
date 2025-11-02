import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import pnjRouter from './routes/pnj.js';
import questRouter from './routes/quest.js';
import monsterRouter from './routes/monster.js';
import lootRouter from './routes/loot.js';
import exportRouter from './routes/exporter.js';
import billingRouter from './routes/billing.js';
import authRouter from './routes/auth.js';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit:'5mb' }));

app.use('/api', pnjRouter);
app.use('/api', questRouter);
app.use('/api', monsterRouter);
app.use('/api', lootRouter);
app.use('/api', exportRouter);
app.use('/api', billingRouter);
app.use('/api', authRouter);

app.get('/', (req,res)=>res.json({ ok:true, name:'Sheet2Scene QuickTry v1' }));

const port = process.env.PORT || 8787;
app.listen(port, ()=>console.log('[QuickTry] API on http://localhost:'+port));
