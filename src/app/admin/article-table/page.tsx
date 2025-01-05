import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { getArticles, getArticlesCount } from "@/apiCalls/articlesApiCalls";
import { Article } from "@prisma/client";
import Link from "next/link";
import Pagination from "@/app/article/Pagination";
import DeletArticle from "./DeletArticle";
import EditArticleModal from "./EditArticleModal";

interface ArticleTableParams {
  searchParams: { pageNumber: string };
}

const ArticleTablePage = async ({
  searchParams: { pageNumber },
}: ArticleTableParams) => {
  const articles: Article[] = await getArticles(pageNumber);
  const articlesCount: number = await getArticlesCount();
  const pages = Math.ceil(articlesCount / ARTICLE_PER_PAGE);

  return (
    <section className="p-5">
      <h1 className="text-main text-3xl mt-4">{"جميع المقالات"}</h1>
      <table className="table w-full text-right mb-6 mt-8">
        <thead className="border-t-2 border-b-2 border-gray-200 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-4 text-gray-800 font-normal">
              {"العنوان"}
            </th>
            <th className="hidden lg:inline-block lg:p-4 font-normal">
              {"وقت النشر"}
            </th>
            <th className="font-normal">{"الاعدادات"}</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-b border-t border-gray-100">
              <td className="p-4 text-gray-700">{article.title}</td>
              <td>{new Date(article.createdAt).toDateString()}</td>
              <td>
                <EditArticleModal
                  title={article.title}
                  discription={article.discription}
                  articleId={article.id}
                />
                <DeletArticle articleId={article.id} />
              </td>
              <td>
                <Link
                  rel="preload"
                  className="text-blue-500"
                  href={`/article/${article.id}`}
                >
                  {"قراءة المزيد"}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNum={parseInt(pageNumber)}
        route="article-table"
        pages={pages}
      />
    </section>
  );
};

export default ArticleTablePage;
