import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import pnjRouter from './routes/pnj.js';
import questRouter from './routes/quest.js';
import helpRouter from './routes/help.js';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit:'5mb' }));

app.use('/api', pnjRouter);
app.use('/api', questRouter);
app.use('/api', helpRouter);

app.get('/', (req,res)=>res.json({ ok:true, name:'Sheet2Scene QuickTry v1.6' }));
const port = process.env.PORT || 8787;
app.listen(port, ()=>console.log('[QuickTry] API on http://localhost:'+port));
