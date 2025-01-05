import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();

    if (!users)
      return NextResponse.json({ message: "not user found" }, { status: 404 });
    const userFromToken = verifyToken(request);
    if (userFromToken === null) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }

    if (!userFromToken.isAdmin) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
