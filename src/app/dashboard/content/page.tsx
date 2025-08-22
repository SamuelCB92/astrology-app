"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redireciona se não estiver logado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") return <p>Carregando...</p>;

  const premiumContent = [
    "Sua leitura personalizada de Tarô: O Sol invertido indica reflexão.",
    "Dica de Astrologia Védica: Hoje é um dia favorável para meditação e planejamento.",
    "Orientação exclusiva: Foque em seus objetivos e evite distrações.",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white px-4">
      <h1 className="text-4xl font-bold mb-6">
        Bem-vindo, {session?.user?.email}!
      </h1>

      <p className="mb-4">Aqui está seu conteúdo exclusivo e premium:</p>

      <ul className="list-disc pl-6 mb-6">
        {premiumContent.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <button
        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sair
      </button>
    </main>
  );
}
