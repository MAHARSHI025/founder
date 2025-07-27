"use client";

import { usePathname } from "next/navigation";
import Navbar2 from "@/components/Navbar2";

export default function Wrapper({ children }) {
  const pathname = usePathname();

  const hideNavbarRoutes = ["/chat", "/signup", "/some/other/path"];
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar2 />}
      {children}
    </>
  );
}
