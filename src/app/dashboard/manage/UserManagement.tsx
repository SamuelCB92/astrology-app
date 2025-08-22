"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name?: string;
  role: "FREE" | "PREMIUM" | "ADMIN";
  subscriptionStatus: "INACTIVE" | "ACTIVE" | "EXPIRED" | "CANCELLED";
  subscriptionStart?: string;
  subscriptionEnd?: string;
}

interface UserManagementProps {
  users: User[];
  onUserUpdate: () => void;
}

export default function UserManagement({
  users,
  onUserUpdate,
}: UserManagementProps) {
  const router = useRouter();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRoleChange = async (userId: string, newRole: User["role"]) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/dashboard/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        onUserUpdate();
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubscriptionChange = async (
    userId: string,
    newStatus: User["subscriptionStatus"]
  ) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/dashboard/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionStatus: newStatus,
          subscriptionStart:
            newStatus === "ACTIVE" ? new Date().toISOString() : undefined,
          subscriptionEnd:
            newStatus === "ACTIVE"
              ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
              : undefined,
        }),
      });

      if (res.ok) {
        onUserUpdate();
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const viewUserDashboard = (userEmail: string) => {
    router.push(`/dashboard/member/${encodeURIComponent(userEmail)}`);
  };

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
    <div className="w-full max-w-6xl">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Gerenciar Membros</h2>
        <p className="text-gray-400">Total de usuários: {users.length}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{user.name || "Sem nome"}</h3>
                <p className="text-gray-300 text-sm">{user.email}</p>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs px-2 py-1 rounded ${getRoleColor(
                    user.role
                  )} bg-gray-700`}
                >
                  {user.role}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-sm text-gray-400">
                  Status da Assinatura:
                </label>
                <select
                  value={user.subscriptionStatus}
                  onChange={(e) =>
                    handleSubscriptionChange(
                      user.id,
                      e.target.value as User["subscriptionStatus"]
                    )
                  }
                  disabled={isUpdating}
                  className="w-full mt-1 p-2 rounded bg-gray-700 text-white text-sm"
                >
                  <option value="INACTIVE">Inativo</option>
                  <option value="ACTIVE">Ativo</option>
                  <option value="EXPIRED">Expirado</option>
                  <option value="CANCELLED">Cancelado</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Função:</label>
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user.id, e.target.value as User["role"])
                  }
                  disabled={isUpdating}
                  className="w-full mt-1 p-2 rounded bg-gray-700 text-white text-sm"
                >
                  <option value="FREE">Gratuito</option>
                  <option value="PREMIUM">Premium</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              {user.subscriptionStart && (
                <div className="text-xs text-gray-400">
                  <p>
                    Início:{" "}
                    {new Date(user.subscriptionStart).toLocaleDateString(
                      "pt-BR"
                    )}
                  </p>
                  {user.subscriptionEnd && (
                    <p>
                      Fim:{" "}
                      {new Date(user.subscriptionEnd).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => viewUserDashboard(user.email)}
                className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white transition-colors"
              >
                👁️ Ver Dashboard
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Nenhum usuário encontrado.</p>
        </div>
      )}
    </div>
  );
}
