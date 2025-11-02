import { ReactNode } from "react";
export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (<section style={{background:"#fcf6e8",border:"1px solid #c8b68c",borderRadius:12,padding:16,boxShadow:"0 2px 10px rgba(0,0,0,.08)",marginBottom:16}}>
    <h2 style={{margin:0,fontWeight:700,fontSize:18}}>{title}</h2><div style={{marginTop:8}}>{children}</div></section>);
}
