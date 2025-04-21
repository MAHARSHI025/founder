import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Session from "./components/Session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Founder by thoughter",
  description: "A dating site by thoughter",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <Session>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,1,200" />

          <Navbar />
          {children}
        </body>
      </Session>
    </html>
  );
}
