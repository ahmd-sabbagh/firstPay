import { DOMAIN } from "@/utils/constants";
import { toast } from "react-toastify";
export const GetUsersTable = async (token: string) => {
  try {
    const response = await fetch(`${DOMAIN}/api/users`, {
      cache: "no-store",
      headers: {
        Cookie: `jwtCookie=${token}`,
      },
    });
    return await response.json();
  } catch (error: any) {
    toast.error(error?.response?.data.message);
  }
};
