import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  // 1. Pobierz sesję (await)
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Pobierz parametry
  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get("time_range") || "medium_term";
  const limit = searchParams.get("limit") || "20";
  const offset = searchParams.get("offset") || "0";

  // 3. Walidacja typu
  const type = params.type;
  if (type !== "artists" && type !== "tracks") {
    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 }
    );
  }

  // 4. Zbuduj URL do Spotify API
  const spotifyUrl = new URL(`https://api.spotify.com/v1/me/top/${type}`);
  spotifyUrl.searchParams.append("time_range", timeRange);
  spotifyUrl.searchParams.append("limit", limit);
  spotifyUrl.searchParams.append("offset", offset);

  // 5. Wykonaj zapytanie do Spotify
  try {
    const res = await fetch(spotifyUrl.toString(), {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error?.message || "Spotify API error" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
