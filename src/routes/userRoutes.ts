import { Route } from "@/types";

export const userRoutes : Route[] = [
    {
      title: "Blog Management dashboard",
      url:"/dashboard",
      items: [
        {
          title: "Write blog",
          url: "/dashboard/create-blog",
        },
        {
          title: "History",
          url: "/dashboard/history",
        },
      ],
    },
  ]