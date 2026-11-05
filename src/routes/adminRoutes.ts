import { Route } from "@/types";

export const adminRoutes : Route[] = [
    {
      title: "Admin Dashboard",
      url:"/admin-dashboard",
      items: [
        {
          title: "Statistics",
          url: "/admin-dashboard/Statistics",
        },
        {
          title: "Manage User",
          url: "/admin-dashboard/Statistics",
        },
      ],
    },
  ]