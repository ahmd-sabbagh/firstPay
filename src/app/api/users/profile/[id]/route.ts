import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { updateUserDto } from "@/utils/dtos";
import { SetCookie } from "@/utils/jwt";

interface Props {
  params: { id: string };
}

/**
 * @method DELETE
 * @route ~/api/users/profile
 * @desc Delete Profile
 * @access Private
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: { comment: true },
    });

    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (
      userFromToken !== null &&
      (userFromToken.id === user.id || userFromToken.isAdmin === true)
    ) {
      await prisma.user.delete({ where: { id: parseInt(params.id) } });
      const commentsIds: number[] = user?.comment.map((comment) => comment.id);
      await prisma.comment.deleteMany({
        where: {
          id: {
            in: commentsIds,
          },
        },
      });
      return NextResponse.json(
        { message: "your profile has been deleted" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "only user himself can deleted his profile, forbidden" },
      { status: 403 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method GET
 * @route ~/api/users/profile
 * @desc Get Profile
 * @access Private
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      select: {
        id: true,
        email: true,
        username: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    if (!user)
      return NextResponse.json({ message: "not user found" }, { status: 404 });

    const userFromToken = verifyToken(request);

    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allowed, access denied" },
        { status: 403 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/users/profile
 * @desc Update Profile
 * @access Private
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);
    if (userFromToken === null) {
      return NextResponse.json(
        { message: "You Are Not Allowed, Access Denied" },
        { status: 403 }
      );
    }
    if (userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "You Are Not Allowed, Access Denied" },
        { status: 403 }
      );
    }
    const body = (await request.json()) as updateUserDto;

    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    const updateUser = await prisma.user.update({
      where: { id: parseInt(params.id) },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
        isAdmin: body.isAdmin,
      },
    });
    const cookie = SetCookie({
      id: updateUser.id,
      isAdmin: updateUser.isAdmin,
      username: updateUser.username,
    });
    const { password, ...other } = updateUser;
    return NextResponse.json(
      { message: "success", ...other },
      {
        status: 200,
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
