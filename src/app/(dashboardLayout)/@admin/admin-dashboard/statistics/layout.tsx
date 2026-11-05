import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function StatisticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex gap-2 mb-2">
        <Button render={<Link href="/dashboard/statistics/weekly"></Link>}>
          Weekly
        </Button>
        <Button render={<Link href="/dashboard/statistics/monthly"></Link>}>
          Monthly
        </Button>
      </div>
      {children}
    </div>
  );
}
