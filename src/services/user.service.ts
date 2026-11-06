import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userServices = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return {
          data: null,
          error: { message: "Session is messing login first" },
        };
      }
      return { session, error: null };
    } catch (error) {
      return { data: null, error: `Something went wrong ${error}` };
    }
  },
};
