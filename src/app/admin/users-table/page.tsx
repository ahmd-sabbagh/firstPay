import { GetUsersTable } from "@/apiCalls/usersTableCalls";
import { cookies } from "next/headers";
import Setting from "./Setting";
import DeletUser from "./DeleteUser";

const UsersTable = async () => {
  const token = cookies().get("jwtCookie")?.value || "";
  const users = await GetUsersTable(token);

  return (
    <section className="p-5">
      <h1 className="text-main text-3xl mt-4">{"جميع المستخدمين"}</h1>
      <table className="table w-full text-right mb-6 mt-8">
        <thead className="border-t-2 border-b-2 border-gray-200 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-4 text-gray-800 font-normal">{"الاسم"}</th>
            <th className="hidden lg:inline-block lg:p-4 font-normal">
              {"وقت الانشاء"}
            </th>
            <th className="font-normal">{"الاعدادات"}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr className="border-b border-t border-gray-100" key={user.id}>
              <td className="p-4 text-gray-700">{user.username}</td>
              <td>{new Date(user.createdAt).toDateString()}</td>
              <td>
                <div className="flex items-center gap-4">
                  <Setting user={user} />
                  <DeletUser commentId={user.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UsersTable;
