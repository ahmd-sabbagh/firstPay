import { DOMAIN } from "@/utils/constants";
import { Article } from "@prisma/client";

// Get articles based on pageNumber
export async function getArticles(
  pageNumber: string | undefined
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${!pageNumber ? "1" : pageNumber}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

// Get Articles Count

export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("error to fetch articles");
  }
  return (await response.json()) as number;
}

// Get Articles By Search Text

export async function getArticlesBySearchText(
  searchText: string
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles/search?textSearch=${searchText}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("error to fetch articles");
  }
  return (await response.json()) as Article[];
}

// Get Article Single

export async function GetArticleSingle(articleId: string) {
  try {
    const response = await fetch(`${DOMAIN}/api/articles/${articleId}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error("error to fetch articles");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
