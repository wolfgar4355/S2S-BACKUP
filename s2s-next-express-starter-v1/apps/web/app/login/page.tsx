export default function Login(){
  return (
    <div style={{minHeight:'100vh', display:'grid', placeItems:'center', background:'#121212', color:'#eee'}}>
      <div style={{border:'1px solid #333', padding:24, borderRadius:12, width:360}}>
        <h1>Login</h1>
        <label>Email<br/><input style={{width:'100%'}} placeholder="you@example.com"/></label><br/><br/>
        <label>Password<br/><input style={{width:'100%'}} type="password"/></label><br/><br/>
        <button style={{width:'100%'}}>Sign in</button>
      </div>
    </div>
  );
}
