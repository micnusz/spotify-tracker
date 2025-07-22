"use client";
import Spinner from "@/components/Spinner";
import TopArtists from "@/components/TopArtists";
import { useUser } from "@/hooks/useUser";
import { useUserTopArtists } from "@/hooks/useUserTopItems";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const DashboardClientPage = () => {
  const [page, setPage] = useState(0);
  const limit = 12;

  const { data: session, status } = useSession();
  const { data: userData, isLoading: isLoadingUserData, error } = useUser();
  const { data: topData, isLoading: isLoadingTopData } = useUserTopArtists({
    offset: page * limit,
    limit,
  });

  if (status === "loading" || isLoadingUserData) {
    return <Spinner />;
  }
  if (status === "unauthenticated") {
    return (
      <div>
        <p>You must be signed in to view this page.</p>
        <button onClick={() => signIn("spotify")}>Sign in with Spotify</button>
      </div>
    );
  }
  if (error) {
    return <p>Error loading user data: {(error as Error).message}</p>;
  }

  return (
    <div className="px-fluid py-fluid space-y-8">
      {/* Górna sekcja - zdjęcie i dane użytkownika */}
      <div className="flex flex-row gap-8">
        {/* Lewa strona - zdjęcie */}
        <div className="w-1/2 flex justify-center">
          {userData?.profile.images?.[0]?.url ? (
            <div className="relative aspect-square w-42">
              <Image
                src={userData.profile.images[0].url}
                alt="User profile image"
                fill
                className="rounded-full object-cover border-2 border-primary"
              />
            </div>
          ) : (
            <div className="w-42 h-42 rounded-full bg-gray-200 flex items-center justify-center">
              <p>No image</p>
            </div>
          )}
        </div>

        {/* Prawa strona - dane użytkownika */}
        <div className="w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl">Welcome,</h1>
          <h1 className="text-3xl font-bold">
            {userData?.profile.display_name || session?.user?.name}
          </h1>
          {userData?.profile.product ? (
            <div className="text-muted-foreground mt-2">
              <p className="text-chart-3">{userData.profile.product}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">No data available</p>
          )}
        </div>
      </div>

      {/* Dolna sekcja - top artyści */}
      <div className="mt-8">
        <TopArtists
          data={topData}
          isLoading={isLoadingTopData}
          itemsPerPage={12}
        />
      </div>
    </div>
  );
};

export default DashboardClientPage;
