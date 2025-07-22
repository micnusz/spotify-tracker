import { Artist } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing artist id" }, { status: 400 });
  }

  const host = request.headers.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const tokenRes = await fetch(`${protocol}://${host}/api/token`);
  if (!tokenRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch token" },
      { status: 500 }
    );
  }
  const { access_token }: { access_token: string } = await tokenRes.json();

  const res = await fetch(
    `https://api.spotify.com/v1/artists/${encodeURIComponent(id)}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch artist from Spotify" },
      { status: res.status }
    );
  }

  const data: Artist = await res.json();

  return NextResponse.json(data);
}
