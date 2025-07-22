import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = session.accessToken;

  // Równoległe pobieranie danych
  const [profileRes, topArtistsRes] = await Promise.all([
    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
    fetch("https://api.spotify.com/v1/me/top/artists", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
  ]);

  if (!profileRes.ok || !topArtistsRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch data from Spotify" },
      { status: profileRes.status }
    );
  }

  const [profile, topArtists] = await Promise.all([
    profileRes.json(),
    topArtistsRes.json(),
  ]);

  return NextResponse.json({
    profile,
    topArtists,
  });
}
