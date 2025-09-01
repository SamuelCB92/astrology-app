"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@components/navbar";

interface Content {
  id: number;
  title: string;
  type: string;
  body: string;
  userEmail?: string;
  createdAt: string;
}

interface User {
  id: string;
  email: string;
  name?: string;
  role: "FREE" | "PREMIUM" | "ADMIN";
  subscriptionStatus: "INACTIVE" | "ACTIVE" | "EXPIRED" | "CANCELLED";
  subscriptionStart?: string;
  subscriptionEnd?: string;
}

export default function MemberDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const memberEmail = decodeURIComponent(params.email as string);

  const [member, setMember] = useState<User | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redireciona se não estiver logado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Verifica se é o owner
  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.email !== "sam.makes.programs@gmail.com"
    ) {
      router.push("/");
    }
  }, [status, session, router]);

  // Busca informações do membro e seus conteúdos
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // Busca informações do usuário
        const userRes = await fetch("/api/dashboard/users");
        const users = await userRes.json();
        const memberData = users.find((u: User) => u.email === memberEmail);
        setMember(memberData);

        // Busca conteúdos do usuário
        const contentRes = await fetch(
          `/api/dashboard/content?userEmail=${memberEmail}`
        );
        const contentData = await contentRes.json();
        setContents(contentData);
      } catch (error) {
        console.error("Error fetching member data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated" && memberEmail) {
      fetchMemberData();
    }
  }, [status, memberEmail]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-white">Carregando...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-white">Membro não encontrado.</p>
      </div>
    );
  }

  const getStatusColor = (status: User["subscriptionStatus"]) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-400";
      case "EXPIRED":
        return "text-red-400";
      case "CANCELLED":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const getRoleColor = (role: User["role"]) => {
    switch (role) {
      case "ADMIN":
        return "text-purple-400";
      case "PREMIUM":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen items-start bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white px-6 pt-32 pb-8">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header com informações do membro */}
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Dashboard de {member.name || member.email}
                </h1>
                <p className="text-gray-300">Visualizando como membro</p>
              </div>
              <div className="text-right">
                <span
                  className={`text-sm px-3 py-1 rounded ${getRoleColor(
                    member.role
                  )} bg-gray-700`}
                >
                  {member.role}
                </span>
                <span
                  className={`block text-sm px-3 py-1 rounded mt-2 ${getStatusColor(
                    member.subscriptionStatus
                  )} bg-gray-700`}
                >
                  {member.subscriptionStatus}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <strong>Email:</strong> {member.email}
                </p>
                <p>
                  <strong>Nome:</strong> {member.name || "Não informado"}
                </p>
              </div>
              <div>
                {member.subscriptionStart && (
                  <p>
                    <strong>Início da assinatura:</strong>{" "}
                    {new Date(member.subscriptionStart).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                )}
                {member.subscriptionEnd && (
                  <p>
                    <strong>Fim da assinatura:</strong>{" "}
                    {new Date(member.subscriptionEnd).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Conteúdos do membro */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Conteúdos Exclusivos</h2>

            {contents.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {contents.map((content) => (
                  <div key={content.id} className="bg-gray-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{content.title}</h3>
                      <span className="text-xs px-2 py-1 rounded bg-purple-600 text-white">
                        {content.type}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{content.body}</p>
                    <p className="text-xs text-gray-400">
                      Criado em:{" "}
                      {new Date(content.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">
                  Nenhum conteúdo disponível para este membro.
                </p>
              </div>
            )}
          </div>

          {/* Botão voltar */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/dashboard/manage")}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded text-white transition-colors"
            >
              ← Voltar ao Painel de Administração
            </button>
          </div>
        </div>
      </main>
    </>
  );
}











