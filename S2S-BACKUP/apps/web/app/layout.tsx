import "./globals.css";
import BookAnimation from "@/components/BookAnimation";
export const metadata = { title: "Sheet2Scene", description: "Generate scenes, portraits & quests" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="fr"><body><BookAnimation />{children}</body></html>);
}