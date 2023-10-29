import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pluto's Pizza Shop",
  description: "Yummy pizza for Pluto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="retro">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center px-4 py-12 max-w-lg mx-auto ">
          <h2 className="text-3xl font-bold tracking-tight">
            Pluto's Pizza Shop{" "}
          </h2>
          {children}
        </main>
      </body>
    </html>
  );
}
