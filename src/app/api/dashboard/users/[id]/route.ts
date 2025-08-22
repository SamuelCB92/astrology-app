import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { role, subscriptionStatus, subscriptionStart, subscriptionEnd } =
      await req.json();

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(role && { role }),
        ...(subscriptionStatus && { subscriptionStatus }),
        ...(subscriptionStart && {
          subscriptionStart: new Date(subscriptionStart),
        }),
        ...(subscriptionEnd && { subscriptionEnd: new Date(subscriptionEnd) }),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
