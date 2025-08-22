"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔹 Mostra nada enquanto o status está carregando
  if (status === "loading") return null;

  if (session) {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => router.push("/dashboard/content")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Dashboard
        </button>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => router.push("/auth/signin")}
      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
    >
      Login
    </button>
  );
}
