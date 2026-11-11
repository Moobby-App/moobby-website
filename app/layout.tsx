import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const title = "Moobby — Lebih siap berangkat naik KRL";
const description = "Lebih siap berangkat dengan Moobby. Cek kabar gangguan KRL terkurasi yang relevan dengan rutemu, pahami dampaknya, dan lihat pilihan perjalanan.";

export const metadata: Metadata = {
  title,
  description,
  icons: { icon: "/assets/app-icon.png" },
  openGraph: { title, description, locale: "id_ID", type: "website" },
  twitter: { card: "summary", title, description },
};
export const viewport: Viewport = { themeColor: "#9bcaff" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="id"><body id="top">{children}</body></html>;
}
