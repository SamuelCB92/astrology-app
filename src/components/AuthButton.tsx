"use client";
import Button from "@components/Button";

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
        <Button
          variant="secondary"
          size="medium"
          onClick={() => router.push("/dashboard/content")}
        >
          Dashboard
        </Button>
        <Button
          variant="danger"
          size="medium"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sair
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="medium"
      onClick={() => router.push("/auth/signin")}
    >
      Login
    </Button>
  );
}
