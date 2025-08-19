// app/admin/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    // Decode JWT to check role
    const decoded = jwt.verify(token, JWT_SECRET) as { role?: string };

    if (decoded.role !== "ADMIN") {
      redirect("/unauthorized"); // create this page to show "Access Denied"
    }
  } catch (err) {
    redirect("/login");
  }

  // If token is valid and role is ADMIN → render admin pages
  return <>{children}</>;
}
