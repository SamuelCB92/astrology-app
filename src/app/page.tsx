"use client";

import { useSession, signIn } from "next-auth/react";
import AuthButton from "@components/AuthButton";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-6 bg-black bg-opacity-50 fixed top-0 z-50">
        <h1 className="text-2xl font-bold">✨ Tarô & Astrologia ✨</h1>
        <AuthButton />
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-32 pb-20 px-4 animate-fadeIn">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
          Orientações Personalizadas
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Descubra leituras exclusivas de Tarô e Astrologia Védica, feitas sob
          medida para você. Acesse seu espaço privado agora mesmo.
        </p>
      </section>

      {/* Features / Cards */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 mb-20">
        {[
          {
            title: "Leituras Exclusivas",
            text: "Conteúdos únicos e privados, acessíveis somente para assinantes.",
          },
          {
            title: "Orientações Personalizadas",
            text: "Tarô e Astrologia Védica adaptados ao seu estilo de vida e objetivos.",
          },
          {
            title: "Acesso Premium",
            text: "Todos os conteúdos são exclusivos para assinantes, garantindo privacidade e qualidade.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105"
          >
            <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="bg-black bg-opacity-30 py-20 px-4 text-center">
        <h3 className="text-3xl font-bold mb-12">
          O que nossos assinantes dizem
        </h3>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              text: "As leituras são precisas e me ajudaram a tomar decisões importantes. Recomendo!",
              author: "Ana",
            },
            {
              text: "A abordagem personalizada faz toda a diferença. Me sinto muito mais confiante.",
              author: "Carlos",
            },
            {
              text: "Conteúdo exclusivo e de alta qualidade. Vale cada centavo da assinatura.",
              author: "Marina",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg"
            >
              <p>"{testimonial.text}"</p>
              <span className="block mt-4 font-semibold">
                – {testimonial.author}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final (apenas se não estiver logado) */}
      {status !== "authenticated" && (
        <section className="text-center py-20 px-4">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para começar?
          </h3>
          <p className="mb-6 text-lg md:text-xl">
            Cadastre-se agora e tenha acesso ao seu espaço exclusivo de leituras
            personalizadas.
          </p>
          <div className="inline-block">
            <button
              onClick={() => signIn("email")}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white text-lg font-semibold transition"
            >
              Cadastrar-se
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
