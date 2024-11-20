import jwt from "jsonwebtoken";
import { jwtPayload } from "./types";
import { serialize } from "cookie";
export function GenerateToken(payload: jwtPayload): string {
  const secretKey = process.env.JWT_key_SECRET as string;
  const token = jwt.sign(payload, secretKey, {
    expiresIn: "30d",
  });
  return token;
}
// Set Cookie

export function SetCookie(payload: jwtPayload): string {
  const token = GenerateToken(payload);
  const cookie = serialize("jwtCookie", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return cookie;
}
