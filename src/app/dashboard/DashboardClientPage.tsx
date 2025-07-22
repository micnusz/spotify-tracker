"use client";
import Spinner from "@/components/Spinner";
import { useUser } from "@/hooks/useUser";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const DashboardClientPage = () => {
  const { data: session, status } = useSession();
  const { data: userData, isLoading, error } = useUser();

  if (status === "loading" || isLoading) {
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
    <div className="px-fluid py-fluid flex flex-row">
      <div className="flex w-1/2">
        {userData?.profile.images ? (
          <Image
            src={userData.profile.images[0]?.url}
            alt="User profile image"
            width={userData.profile.images[0]?.width || 52}
            height={userData.profile.images[0]?.height || 52}
            className="border-1 rounded-full w-42"
          />
        ) : (
          <p>No image available.</p>
        )}
      </div>
      <div className="flex flex-col w-1/2 border-1">
        <h1 className="text-3xl">Welcome,</h1>
        <h1 className="text-3xl font-bold">
          {userData?.profile.display_name || session?.user?.name}
        </h1>
        {userData?.profile.followers ? (
          <div className="text-muted-foreground">
            <p>{userData.profile.followers.total} Followers</p>
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </div>
      {/* Top Artists */}
      <div></div>
    </div>
  );
};

export default DashboardClientPage;
