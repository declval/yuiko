import "@/app/globals.css";
import Nav from "@/app/nav";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "yuiko",
  description: "Practice touch typing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} flex flex-col h-screen`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
