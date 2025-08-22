"use client";

import { useSession, signIn } from "next-auth/react";
import Navbar from "@components/navbar";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <>
      {/* Navbar fixa */}
      <Navbar />

      <main className="flex flex-col min-h-screen items-center justify-between bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white px-6 pt-32 pb-8">
        {/* Seção principal */}
        <section className="text-center mt-16">
          <h1 className="text-5xl font-bold mb-6">✨ Tarô & Astrologia ✨</h1>
          <p className="text-lg max-w-xl mx-auto mb-8">
            Orientação personalizada através do Tarô e Astrologia Védica. Acesse
            seu espaço exclusivo e conteúdos premium.
          </p>
        </section>

        {/* Seção de destaques */}
        <section className="mt-12 mb-12 max-w-4xl w-full text-center">
          <h2 className="text-3xl font-semibold mb-6">
            O que você encontrará aqui
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Leituras de Tarô personalizadas e detalhadas.</li>
            <li>Dicas diárias de Astrologia Védica.</li>
            <li>Conteúdos exclusivos para assinantes.</li>
            <li>Ferramentas de autoconhecimento e planejamento.</li>
          </ul>
        </section>

        {/* Call-to-Action final apenas para não logados */}
        {!session && (
          <section className="text-center mb-16">
            <p className="text-xl mb-4">
              Comece agora e acesse conteúdos exclusivos!
            </p>
            <button
              onClick={() =>
                signIn("email", { callbackUrl: "/dashboard/content" })
              }
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-white text-lg"
            >
              Criar conta / Login
            </button>
          </section>
        )}
      </main>
    </>
  );
}
