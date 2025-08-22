"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
      >
        Logout
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
    >
      Login
    </button>
  );
}
