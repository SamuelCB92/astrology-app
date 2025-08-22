import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userEmail = url.searchParams.get("userEmail");

    const contents = await prisma.content.findMany({
      where: userEmail ? { userEmail } : {},
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contents);
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { title, type, body, userEmail } = await req.json(); // incluir userEmail

  if (!title || !type || !body || !userEmail) {
    return NextResponse.json(
      { error: "Campos obrigatórios faltando" },
      { status: 400 }
    );
  }

  const content = await prisma.content.create({
    data: { title, type, body, userEmail },
  });

  return NextResponse.json(content, { status: 201 });
}
