import axios from "axios";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Cookie: `accessToken=${token}` },
      withCredentials: true,
    });

    const user = res.data;
    return Response.json(user, { status: 200 });
  } catch (error: any) {
    console.error(
      "Error fetching user:",
      error?.response?.data || error.message
    );
    return Response.json(
      { error: error?.response?.data?.message || "Failed to fetch user" },
      { status: error?.response?.status || 500 }
    );
  }
}
