import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { loginUserDto } from "@/utils/dtos";
import { loginUserSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import { SetCookie } from "@/utils/jwt";

/**
 * @method POST
 * @route ~/api/users/register
 * @desc Create New User
 * @access Puplic
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as loginUserDto;
    const validation = loginUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json(
        {
          message: "invalid email or password",
        },
        { status: 400 }
      );
    }
    const isPassword = await bcrypt.compare(body.password, user.password);
    if (!isPassword) {
      return NextResponse.json(
        { message: "invalid email or password" },
        { status: 400 }
      );
    }

    const cookie = SetCookie({
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    });

    return NextResponse.json(
      { message: "succes" },
      {
        status: 200,
        headers: { "Set-Cookie": cookie },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      {
        status: 500,
      }
    );
  }
}
