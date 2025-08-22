"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@components/navbar";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const result = await signIn("email", {
        email,
        redirect: false,
      });

      if (result?.error) {
        setMessage("Erro ao enviar email. Tente novamente.");
      } else {
        setMessage("Email enviado! Verifique sua caixa de entrada.");
      }
    } catch (error) {
      setMessage("Erro ao enviar email. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white px-6">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">
            ✨ Entrar na sua conta
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                placeholder="seu@email.com"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
            >
              {isLoading ? "Enviando..." : "Enviar link de login"}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-4 rounded-lg text-center ${
                message.includes("enviado")
                  ? "bg-green-900 text-green-100"
                  : "bg-red-900 text-red-100"
              }`}
            >
              {message}
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-900 text-red-100 text-center">
              Erro de autenticação. Tente novamente.
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-purple-300 hover:text-purple-200 underline"
            >
              ← Voltar ao início
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SignInForm />
    </Suspense>
  );
}
