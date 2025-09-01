"use client";
import Button from "@components/Button";

import { useSession } from "next-auth/react";
import AuthButton from "@components/AuthButton";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="w-full fixed top-0 left-0 bg-black bg-opacity-70 backdrop-blur-md z-50 px-6 py-4 flex justify-between items-center">
      {/* Logo / Nome do site */}
      <div
        className="text-white text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span className="block md:hidden">✨ Tarô</span>
        <span className="hidden md:block">✨ Tarô & Astrologia</span>
      </div>

      {/* Botões de ação */}
      <div className="flex items-center gap-4">
        {session?.user?.email === "sam.makes.programs@gmail.com" && (
          <Button
            variant="primary"
            size="small"
            onClick={() => router.push("/dashboard/manage")}
          >
            🛠️ Administrar
          </Button>
        )}
        <AuthButton />
      </div>
    </nav>
  );
}
