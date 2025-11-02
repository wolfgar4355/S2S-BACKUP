import './globals.css';
export const metadata = { title: 'Sheet2Scene Starter' };
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
