'use client';
import React from 'react';
import { t } from '@/app/i18n';

export default function PrivacyCenter(){
  const [analytics, setAnalytics] = React.useState(true);
  const [marketing, setMarketing] = React.useState(false);
  const [busy, setBusy] = React.useState(false);

  async function request(type:'export'|'erase'){
    setBusy(true);
    try{
      const res = await fetch(`/api/privacy/request`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({type}) });
      const j = await res.json();
      alert(j.ok ? t('privacy.toast.requested') : j.error || 'error');
    } finally { setBusy(false); }
  }
  async function save(){
    const res = await fetch(`/api/privacy/consent`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({analytics, marketing}) });
    alert(t('privacy.toast.saved'));
  }
  return (
    <div style={{maxWidth:720, margin:'40px auto', background:'#fff', border:'1px solid #eee', borderRadius:12, padding:16}}>
      <h1>{t('privacy.title')}</h1>
      <p>{t('privacy.subtitle')}</p>

      <section style={{borderTop:'1px solid #eee', paddingTop:12, marginTop:12}}>
        <h3>{t('privacy.requests')}</h3>
        <button disabled={busy} onClick={()=>request('export')}>{t('privacy.request.export')}</button>{' '}
        <button disabled={busy} onClick={()=>request('erase')}>{t('privacy.request.erase')}</button>
        <p style={{opacity:.7}}>{t('privacy.note.sla')}</p>
      </section>

      <section style={{borderTop:'1px solid #eee', paddingTop:12, marginTop:12}}>
        <h3>{t('privacy.consent')}</h3>
        <label><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)} /> {t('privacy.consent.analytics')}</label><br/>
        <label><input type="checkbox" checked={marketing} onChange={e=>setMarketing(e.target.checked)} /> {t('privacy.consent.marketing')}</label><br/>
        <button onClick={save}>{t('privacy.consent.save')}</button>
      </section>
    </div>
  );
}
