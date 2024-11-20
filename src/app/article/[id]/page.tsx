import { SingleArticle } from "@/utils/types";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { Metadata } from "next";
import { GetArticleSingle } from "@/apiCalls/articlesApiCalls";
import { cookies } from "next/headers";
import { verifyTokenForSite } from "@/utils/verifyToken";

interface PropsId {
  params: { id: string };
  searchParams: {};
}
const ArticleDetails = async ({ params }: PropsId) => {
  const token = cookies().get("jwtCookie")?.value || "";
  const user = verifyTokenForSite(token);
  const article: SingleArticle = await GetArticleSingle(params.id);
  return (
    <section className="fix-height">
      <div className="container">
        <div className="py-16 bg-gray-100 rounded-2xl mt-16 w-full md:w-3/4 m-auto">
          <h1 className="text-center text-gray-700 text-2xl">
            {article.title}
          </h1>
          <p className="mt-4 mx-auto text-center font-light text-gray-500 w-3/4">
            {article.discription}
          </p>
        </div>
        <AddComment articleId={parseInt(params.id)} />
        {article.comment.length ? (
          <>
            <h1 className="mt-10 w-full md:w-3/4 m-auto text-2xl">
              {"التعليقات"}
            </h1>
            <div className="w-full md:w-3/4 m-auto mt-5 flex flex-col gap-6 mb-6">
              {article.comment.map((comment) => (
                <Comment comment={comment} userId={user?.id} key={comment.id} />
              ))}
            </div>
          </>
        ) : (
          <div className="noComments w-full md:w-3/4 m-auto my-8 text-center text-3xl">
            No Comments
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleDetails;

export const metadata: Metadata = {
  title: "Articles Details",
  description: "Articles Programing Details",
};
