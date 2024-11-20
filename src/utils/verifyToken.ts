import { NextRequest } from "next/server";
import { jwtPayload } from "./types";
import jwt from "jsonwebtoken";
// veryfy to server
export function verifyToken(request: NextRequest): jwtPayload | null {
  try {
    const jwtToken = request.cookies.get("jwtCookie");
    const token = jwtToken?.value as string;
    if (!token) return null;
    const secretKey = process.env.JWT_key_SECRET as string;
    const userFromToken = jwt.verify(token, secretKey) as jwtPayload;
    return userFromToken;
  } catch (error) {
    return null;
  }
}
// veryfy to site
export function verifyTokenForSite(token: string): jwtPayload | null {
  try {
    const secretKey = process.env.JWT_key_SECRET as string;
    const userFromToken = jwt.verify(token, secretKey) as jwtPayload;
    if (!userFromToken) return null;
    return userFromToken;
  } catch (error) {
    return null;
  }
}
