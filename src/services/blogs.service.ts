import { env } from "@/env";

const API_URL = env.API_URL;

interface BlogParams {
  isFeatured?: boolean;
  search?: string;
}

interface BlogOptions {
  caches?: RequestCache;
  revalidate?: number;
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
};
