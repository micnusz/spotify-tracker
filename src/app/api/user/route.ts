import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { User } from "@/types/types";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  // Pobierz sesję użytkownika
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = session.accessToken;

  // Zapytanie do Spotify o dane zalogowanego użytkownika
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch user data from Spotify" },
      { status: res.status }
    );
  }

  const data: User = await res.json();

  return NextResponse.json(data);
}
