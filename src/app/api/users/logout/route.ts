import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method Get
 * @route ~/api/users/logout
 * @desc Logout From User
 * @access Puplic
 */

export function GET(request: NextRequest) {
  try {
    cookies().delete("jwtCookie");
    return NextResponse.json({ message: "logout success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      {
        status: 500,
      }
    );
  }
}
