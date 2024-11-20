import prisma from "@/utils/db";
import { createUserDto } from "@/utils/dtos";
import { createUserSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {SetCookie } from "@/utils/jwt";

/**
 * @method POST
 * @route ~/api/users/register
 * @desc Create New User
 * @access Puplic
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as createUserDto;
    const validation = createUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    // check user is assign
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { message: "this user is already taken" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(body.password, salt);
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: passwordHashed,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });

    const cookie = SetCookie({
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      username: newUser.username,
    });
    return NextResponse.json(
      { ...newUser },
      {
        status: 201,
        headers: { "Set-Cookie": cookie },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
