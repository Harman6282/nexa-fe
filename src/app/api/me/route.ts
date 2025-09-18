import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const res = await axios.get(`${process.env.API_URL}/auth/me`, {
      headers: { Cookie: `accessToken=${token}` },
    });

    return NextResponse.json(
      { success: true, user: res.data },
      { status: 200 }
    );
  } catch (err: unknown) {
    const status = axios.isAxiosError(err) ? err.response?.status ?? 500 : 500;

    const message = axios.isAxiosError(err)
      ? err.response?.data?.message ?? "Failed to fetch user"
      : "Unexpected error occurred";

    console.error("Error fetching user:", message);

    return NextResponse.json({ success: false, message }, { status });
  }
}
