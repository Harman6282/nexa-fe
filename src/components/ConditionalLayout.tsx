"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import Footer from "./Footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCheckout = pathname?.startsWith("/checkout");

  if (isCheckout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

