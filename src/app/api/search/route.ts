import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  try {
    const response = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/products/search?q=${q}`,
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
};
