import { Metadata } from "next";
import React from "react";
import ArticleItem from "./ArticleItem";
import Pagination from "./Pagination";
import SearchArticle from "./SearchArticle";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { getArticles, getArticlesCount } from "@/apiCalls/articlesApiCalls";
import { Article } from "@prisma/client";
import prisma from "@/utils/db";

interface ArticlePageProps {
  searchParams: { pageNumber: string };
}

const ArticlePage = async ({ searchParams }: ArticlePageProps) => {
  const { pageNumber } = searchParams;
  const articles: Article[] = await getArticles(pageNumber);

  const articlesCount: number = await prisma.article.count();
  const pages = Math.ceil(articlesCount / ARTICLE_PER_PAGE);

  return (
    <section>
      <div className="container">
        <h1 className="text-center text-2xl font-semibold text-gray-700 mt-16">
          {"المقالات"}
        </h1>
        <p className="mt-4 mx-auto text-center font-light text-gray-500 w-3/4">
          {
            "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق."
          }
        </p>
        <SearchArticle />
        <div className="flex items-center justify-center flex-wrap gap-7 py-7">
          {articles.map((article: Article) => (
            <ArticleItem article={article} key={article.id} />
          ))}
        </div>
        <Pagination
          pageNum={parseInt(pageNumber)}
          route="/article"
          pages={pages}
        />
      </div>
    </section>
  );
};

export default ArticlePage;

export const metadata: Metadata = {
  title: "Articles",
  description: "Articles Programing",
};
