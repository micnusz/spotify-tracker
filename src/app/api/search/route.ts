// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "Radiohead";

  // Pobierz token z innego endpointu lub serwera
  const tokenRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/token`);
  if (!tokenRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch token" },
      { status: 500 }
    );
  }

  const { access_token }: { access_token: string } = await tokenRes.json();

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=artist`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Spotify search failed" },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}
