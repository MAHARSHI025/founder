
import Session from "@/components/Session";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Navbar2 from "@/components/Navbar2.js";

export const metadata = {
  title: "Founder by thoughter",
  description: "An platform for founders to connect and grow",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <Session>

        <body className={``}>

          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,1,200" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
          <Toaster />

          {/* <Navbar /> */}

          <Navbar2 />

          {children}
        </body>
      </Session>
    </html>
  );
}
