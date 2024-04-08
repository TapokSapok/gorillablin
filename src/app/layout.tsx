import type { Metadata } from "next";
import { Raleway, Bad_Script } from "next/font/google";
import "@/styles/globals.scss";
import Header from "@/components/layout/header/Header";
import { Toaster } from "sonner";
import { Providers, ProfileContext } from "./providers";

const inter = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "400", "500", "600", "700", "800"],
  variable: "--raleway-font",
});

const caveatBrush = Bad_Script({
  weight: "400",
  variable: "--brush-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GORILLABLIN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${caveatBrush.variable}`}>
        <Providers>
          <Header />
          <main className="main">{children}</main>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
