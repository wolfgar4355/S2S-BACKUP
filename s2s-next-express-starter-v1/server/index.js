import express from 'express';
import cors from 'cors';
import privacyRouter from './routes/privacy.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.get('/health', (req,res)=>res.json({ok:true}));
app.use('/api/privacy', privacyRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log(`[server] listening on http://localhost:${PORT}`));
