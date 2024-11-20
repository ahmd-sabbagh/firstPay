import prisma from "@/utils/db";
import { UpdateArticleDto } from "@/utils/dtos";
import { createArticleSchema } from "@/utils/validationSchema";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route http://localhost:3000/api/articles
 * @desc Get Single Article
 * @access Puplic
 */
interface Props {
  params: { id: string };
}
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        comment: {
          include: {
            user: {
              select: {
                username: true,
                email: true,
                id: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * @method PUT
 * @route http://localhost:3000/api/articles
 * @desc Update Single Article
 * @access Puplic
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }
    const body = (await request.json()) as UpdateArticleDto;
    const validation = createArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    const updateArticle = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        discription: body.discription,
      },
    });

    return NextResponse.json(updateArticle, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
/**
 * @method DELETE
 * @route http://localhost:3000/api/articles
 * @desc Delete Article
 * @access Puplic
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: { comment: true },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 }
      );
    }

    await prisma.article.delete({
      where: { id: parseInt(params.id) },
    });

    const commentsIds: number[] = article?.comment.map((comment) => comment.id);
    await prisma.comment.deleteMany({ where: { id: { in: commentsIds } } });

    return NextResponse.json({ message: "article deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
