import { User, UserTopArtists } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

interface UserResponse {
  profile: User;
  topArtists: UserTopArtists;
}

export async function fetchUser(): Promise<UserResponse> {
  const res = await fetch("/api/user");
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export function useUser() {
  return useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
}
