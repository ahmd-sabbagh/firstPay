import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/articles/search
 * @desc Get Articles By Word Search
 * @access Puplic
 */

export async function GET(request: NextRequest) {
  try {
    const textSearch = request.nextUrl.searchParams.get("textSearch");
    let articles;
    
    if (textSearch) {
      articles = await prisma.article.findMany({
        where: {
          title: {
            startsWith: textSearch,
            mode: "insensitive",
          },
        },
      });
    } else {
      articles = await prisma.article.findMany({ take: 6 });
    }
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "article not found" }, { status: 404 });
  }
}