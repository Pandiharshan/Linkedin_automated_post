import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import AuthProvider from "./components/AuthProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Post Assistant – Turn Thoughts Into LinkedIn Presence",
  description:
    "A stateless AI-powered LinkedIn automation tool. Convert raw thoughts into high-quality post variations and publish instantly.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.className}>
      <head>
        {/* Material Symbols */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        {/* Ambient background blobs */}
        <div className="ambient-blob w-[45vw] h-[45vw] top-[-10%] right-[-10%] bg-[#D8A7B1]" />
        <div className="ambient-blob w-[40vw] h-[40vw] bottom-[-12%] left-[-8%] bg-[#EFE9E1]" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
