"use server";
import { fetchUser } from "@/hooks/useUser";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import DashboardClientPage from "./DashboardClientPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const DashboardServerPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardClientPage />
    </HydrationBoundary>
  );
};

export default DashboardServerPage;
