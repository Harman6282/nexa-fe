import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Analytics />
      <Toaster />
    </>
  );
}

