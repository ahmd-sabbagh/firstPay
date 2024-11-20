import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwtCookie")
  const token = jwtToken?.value as string
  if (!token) {
    return NextResponse.json(
      { message: "not token provided ! from middleware" },
      { status: 401 }
    );
  }
}
export const config = {
  matcher: ["/api/users/profile/:paht*"],
};
