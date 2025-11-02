export function t(key: string){
  const en: Record<string,string> = {
    'privacy.title':'Privacy',
    'privacy.subtitle':'Control your data and requests.',
    'privacy.requests':'Requests',
    'privacy.request.export':'Request export',
    'privacy.request.erase':'Request erasure',
    'privacy.consent':'Consents',
    'privacy.consent.analytics':'Analytics',
    'privacy.consent.marketing':'Marketing',
    'privacy.consent.save':'Save preferences',
    'privacy.toast.requested':'Privacy request submitted',
    'privacy.toast.saved':'Preferences saved',
    'privacy.note.sla':'Most requests are completed within 30 days.'
  };
  return en[key] || key;
}
