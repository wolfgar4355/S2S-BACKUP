import express from 'express'; import cors from 'cors';
import fs from 'fs'; import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { handleBrief, getTokens } from './agents/da.js';
import { createTasks, listAssets } from './agents/designer.js';
import { optimize, build } from './agents/tech3d.js';

const __filename = fileURLToPath(import.meta.url); const __dirname = path.dirname(__filename);
const app = express(); app.use(cors()); app.use(express.json()); app.use(express.static('public'));
const upload = multer({ dest: 'work/uploads' });

app.get('/', (_,res)=> res.sendFile(path.join(__dirname,'..','public','dashboard.html')));

// DA
app.post('/agents/da/brief', async (req,res)=> res.json(await handleBrief(req.body||{})));
app.get('/agents/da/tokens', async (_,res)=> res.json(await getTokens()));

// Designer
app.post('/agents/designer/tasks', async (req,res)=> res.json(await createTasks(req.body||{})));
app.get('/agents/designer/assets', async (_,res)=> res.json(await listAssets()));

// Tech3D
app.post('/agents/tech3d/optimize', async (req,res)=> res.json(await optimize(req.body||{})));
app.get('/agents/tech3d/build', async (_,res)=> res.json(await build()));

// Upload endpoint (optional)
app.post('/upload', upload.single('file'), (req,res)=> res.json({ok:true, file:req.file}));

const PORT = process.env.PORT || 8790;
app.listen(PORT, ()=> console.log('Agents runtime on http://localhost:'+PORT));
