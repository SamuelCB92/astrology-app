"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ContentForm from "./ContentForm";
import UserManagement from "./UserManagement";
import Navbar from "@components/navbar";

interface Content {
  id: number;
  title: string;
  type: string;
  body: string;
  userEmail?: string;
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

export default function ManagePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contents, setContents] = useState<Content[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<"content" | "users">("users");

  // Redireciona se não estiver logado
  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  const fetchContents = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch("/api/dashboard/content");
      const data = await res.json();
      setContents(data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/dashboard/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchContents();
      fetchUsers();
    }
  }, [status, session?.user?.email]);

  if (status === "loading") return <p className="p-4">Carregando...</p>;

  // 🔑 Apenas o dono pode gerenciar conteúdos
  const ownerEmail = "sam.makes.programs@gmail.com";
  if (session?.user?.email !== ownerEmail) {
    return (
      <main className="flex flex-col min-h-screen items-center justify-center bg-gray-900 text-white">
        <h1 className="text-xl font-bold">Acesso restrito</h1>
        <p>Você não tem permissão para gerenciar conteúdos.</p>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen items-center justify-start bg-gray-900 text-white px-6 pt-32 pb-8">
        <h1 className="text-3xl font-bold mb-6">Painel de Administração</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "users"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            👥 Gerenciar Membros
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === "content"
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            📝 Gerenciar Conteúdo
          </button>
        </div>

        {activeTab === "users" ? (
          <UserManagement users={users} onUserUpdate={fetchUsers} />
        ) : (
          <div className="w-full max-w-4xl">
            <ContentForm onSave={fetchContents} />

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">
                Conteúdos Existentes:
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {contents.map((c) => (
                  <div key={c.id} className="bg-gray-800 p-4 rounded">
                    <h3 className="font-bold">{c.title}</h3>
                    <p className="italic text-purple-300">{c.type}</p>
                    <p className="mt-2">{c.body}</p>
                    <p className="text-sm mt-2 text-gray-400">
                      Usuário: {c.userEmail || "Todos"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
