import Session from "@/components/Session";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import MainLoader from "@/components/MainLoader";
import Wrapper from "@/components/Wrapper";

export const metadata = {
  title: "Founder",
  description: "A platform for founders to connect and grow",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       <link rel="icon" type="image/svg+xml" href="/icon.png" />


        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet"></link>

      </head>
      <body>
        <Session>
          <Toaster />
          <Wrapper>

            {children}
          </Wrapper>
        </Session>
      </body>
    </html>
  );
}
