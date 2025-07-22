import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || "20";
  const offset = searchParams.get("offset") || "0";

  const spotifyUrl = new URL(`https://api.spotify.com/v1/me/playlists`);
  spotifyUrl.searchParams.append("limit", limit);
  spotifyUrl.searchParams.append("offset", offset);

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
