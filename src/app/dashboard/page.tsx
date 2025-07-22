"use server";

import Spinner from "@/components/Spinner";
import { signIn, useSession } from "next-auth/react";

const DashboardServerPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <span>
        <Spinner />
      </span>
    );

  if (!session) {
    signIn("spotify");
    return <p>Redirecting to login...</p>;
  }

  return <div></div>;
};

export default DashboardServerPage;
