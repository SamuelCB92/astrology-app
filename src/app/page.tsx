"use client";

import { useSession, signIn } from "next-auth/react";
import Navbar from "@components/navbar";
import Card from "@components/Card";

const cards = [
  {
    title: "Tarô",
    variant: "default",
    content:
      "Leituras personalizadas e detalhadas do Tarô para orientação espiritual.",
    featured: false,
  },
  {
    title: "Astrologia",
    variant: "highlighted",
    content: "Análise astrológica védica para autoconhecimento e planejamento.",
    featured: false,
  },
  {
    title: "Tarô & Astrologia",
    variant: "dark",
    content: "Combinação única de ambas as práticas para orientação completa.",
    featured: true,
  },
];

export default function HomePage() {
  const { data: session } = useSession();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCard = (card: any, index: number) => {
    return (
      <Card
        key={index}
        title={card.title}
        variant={card.variant}
        fullWidth={card.featured}
      >
        <p>{card.content}</p>
      </Card>
    );
  };

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

          <div className="space-y-4">
            {/* Featured card takes full width */}
            {cards.filter((card) => card.featured).map(renderCard)}

            {/* Regular cards in a grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              {cards.filter((card) => !card.featured).map(renderCard)}
            </div>
          </div>
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
