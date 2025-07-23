"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SignInClientPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-2">
      <p>You must be signed in to view this page.</p>
      <Button
        variant="default"
        onClick={() => signIn("spotify", { callbackUrl: "/dashboard" })}
      >
        Sign in with Spotify
      </Button>
    </div>
  );
};

export default SignInClientPage;
