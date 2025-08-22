"use client";

import { useState, useEffect } from "react";

interface ContentFormProps {
  onSave: () => void;
}

export default function ContentForm({ onSave }: ContentFormProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Tarot");
  const [body, setBody] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  // Carrega usuários existentes (emails de assinantes)
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/dashboard/users"); // endpoint que retorna todos os emails
      const data = await res.json();
      setUsers(data);
      if (data.length > 0) setUserEmail(data[0]); // seleciona primeiro email por padrão
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !type || !body || !userEmail) return;

    await fetch("/api/dashboard/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, type, body, userEmail }),
    });

    setTitle("");
    setBody("");
    setType("Tarot");
    setUserEmail(users[0] || "");

    onSave(); // atualiza lista de conteúdos
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-xl"
    >
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white"
      >
        <option value="Tarot">Tarot</option>
        <option value="Astrologia">Astrologia</option>
      </select>

      <select
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white"
      >
        {users.map((u) => (
          <option key={u} value={u}>
            {u}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Conteúdo"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white"
        rows={4}
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
      >
        Salvar Conteúdo
      </button>
    </form>
  );
}
