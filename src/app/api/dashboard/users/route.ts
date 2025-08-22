import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Busca todos os usuários com informações completas
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        subscriptionStatus: true,
        subscriptionStart: true,
        subscriptionEnd: true,
      },
      orderBy: { email: "asc" },
    });

    return NextResponse.json(users);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    return NextResponse.json(
      { error: "Não foi possível buscar usuários" },
      { status: 500 }
    );
  }
}
