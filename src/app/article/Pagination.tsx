import Link from "next/link";

interface PaginationTypes {
  pageNum: number;
  pages: number;
  route: string;
}

const Pagination = ({ pageNum, pages, route }: PaginationTypes) => {
  if (!pageNum) {
    pageNum = 1;
  }
  let pageNumberArray: number[] = [];
  for (let i = 1; i <= pages; i++) pageNumberArray.push(i);
  const prev = pageNum - 1;
  const next = pageNum + 1;
  return (
    <div className="flex items-center gap-3 justify-center mb-5" dir="ltr">
      {pageNum !== 1 && (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className="border p-2 bg-gray-100 cursor-pointer"
        >
          prev
        </Link>
      )}

      {pageNumberArray.map((number) => (
        <Link
          href={`${route}?pageNumber=${number}`}
          className="border p-2 bg-gray-100 cursor-pointer"
          key={number}
        >
          {number}
        </Link>
      ))}
      {pageNum !== pages && (
        <Link
          href={`${route}?pageNumber=${next}`}
          className="border p-2 bg-gray-100 cursor-pointer"
        >
          next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
