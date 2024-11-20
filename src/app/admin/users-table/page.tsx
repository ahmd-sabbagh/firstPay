import React from 'react'

const UsersTable = () => {
  return (
    <section className="p-5">
    <h1 className="text-main text-3xl mt-4">{"جميع التعليقات"}</h1>
    <table className="table w-full text-right mb-6 mt-8">
      <thead className="border-t-2 border-b-2 border-gray-200 lg:text-xl">
        <tr>
          <th className="p-1 lg:p-4 text-gray-800 font-normal">
            {"التعليق"}
          </th>
          <th className="hidden lg:inline-block lg:p-4 font-normal">
            {"وقت النشر"}
          </th>
          <th className="font-normal">{"الاعدادات"}</th>
        </tr>
      </thead>
      <tbody>
        {/* {comments.map((comment) => (
          <tr className="border-b border-t border-gray-100" key={comment.id}>
            <td className="p-4 text-gray-700">{comment.text}</td>
            <td>{new Date(comment.createdAt).toDateString()}</td>
            <td>
              <DeletComment commentId={comment.id} />
            </td>
            <td>
              <Link
                className=" text-blue-500"
                href={`/article/${comment.articleId}`}
              >
                {"الـذهاب الي المقالة"}
              </Link>
            </td>
          </tr>
        ))} */}
      </tbody>
    </table>
  </section>
  )
}

export default UsersTable