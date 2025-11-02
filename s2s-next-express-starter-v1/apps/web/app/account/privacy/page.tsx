import dynamic from 'next/dynamic';
const PrivacyCenter = dynamic(()=>import('@/components/PrivacyCenter'), { ssr:false });
export default function Page(){ return <PrivacyCenter/> }
