import { ARTICLE_PER_PAGE } from "@/utils/constants";
import prisma from "@/utils/db";
import { CreateArticleDto } from "@/utils/dtos";
import { createArticleSchema } from "@/utils/validationSchema";
import { Article } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/articles
 * @desc Get All Articles
 * @access Puplic
 */

export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    console.log("page",pageNumber);
    
    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(articles);
  } catch (error) {
    NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * @method POST
 * @route ~/api/articles
 * @desc Create New Article
 * @access Puplic
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateArticleDto;
    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        discription: body.discription,
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
