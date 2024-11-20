import { getArticlesBySearchText } from "@/apiCalls/articlesApiCalls";
import ArticleItem from "../ArticleItem";
import { Article } from "@prisma/client";

interface SearchArticlPageProps {
  searchParams: { textSearch: string };
}
const SearchArticlePage = async ({
  searchParams: { textSearch },
}: SearchArticlPageProps) => {
  const articles = await getArticlesBySearchText(textSearch);

  return (
    <section className="fix-height">
      <div className="container">
        <h1 className="text-center mt-16">{textSearch}</h1>
        <div className="flex items-center justify-center flex-wrap gap-7 py-7">
        {articles?.map((article: Article) => (
            <ArticleItem article={article} key={article.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchArticlePage;
