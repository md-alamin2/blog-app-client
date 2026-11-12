import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

interface BlogParams {
  isFeatured?: boolean;
  search?: string;
}

interface BlogOptions {
  caches?: RequestCache;
  revalidate?: number;
}

export interface BlogData{
  title: string,
  content: string,
  status: string
  tags?: string[]
}

export const blogService = {
  getPost: async function (params: BlogParams, options: BlogOptions) {
    try {
      // config url
      const url = new URL(`${API_URL}/posts`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      //   config options
      const config: RequestInit = {};
      if (options.caches) {
        config.cache = options.caches;
      }
      if (options.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next={...config.next, tags:["blogPosts"]}

      //   fetching blog data
      const res = await fetch(url.toString(), config);
      const posts = await res.json();

      return { data: posts, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  getPostById: async function (id: string) {
    try {
      //   fetching blog data
      const res = await fetch(`${API_URL}/posts/${id}`);
      const post = await res.json();
      return { data: post.data, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  createPost: async function(blogData: BlogData){
    try {
      const cookieStore = await cookies();
      
          const res = await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Cookie: cookieStore.toString(),
            },
            body: JSON.stringify(blogData),
          });

          const data = await res.json()

          if(data.error){
            return {data: null, error:{message: data.error|| "Error: post not created"}}
          }

          return {data: data.data, error: null}
    } catch (error) {
      return {data: null, error:{message: "Some thing went wrong"}}
    }
  }
};
