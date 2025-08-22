"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@components/navbar";

interface Content {
  id: number;
  title: string;
  type: string;
  body: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [premiumContent, setPremiumContent] = useState<Content[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const fetchContents = async () => {
        try {
          const res = await fetch(
            `/api/dashboard/content?userEmail=${session?.user?.email}`
          );

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          setPremiumContent(data);
        } catch (error) {
          console.error("Error fetching content:", error);
          setPremiumContent([]);
        }
      };

      fetchContents();
    } else if (status === "unauthenticated") {
      // Clear content when user is not authenticated
      setPremiumContent([]);
    }
  }, [status, session?.user?.email]);

  if (status === "loading") return <p className="p-4">Carregando...</p>;

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen items-center justify-start bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white px-6 pt-32 pb-8">
        <h1 className="text-4xl font-bold mb-6">
          Bem-vindo, {session?.user?.email}!
        </h1>

        <p className="mb-4 text-lg">
          Aqui está seu conteúdo exclusivo e premium:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          {premiumContent.map((item) => (
            <li key={item.id}>
              <h3 className="font-bold">{item.title}</h3>
              <p className="italic">{item.type}</p>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>

        <button
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sair
        </button>
      </main>
    </>
  );
}
