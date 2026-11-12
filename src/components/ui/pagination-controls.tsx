"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./button";
import { useRouter, useSearchParams } from "next/navigation";

interface paginationControlProps {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage: number;
  };
}

export default function PaginationControls({ meta }: paginationControlProps) {
  const { total, page, limit, totalPage } = meta;
  const searchParams = useSearchParams();
  const router = useRouter();

  const navigationToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="max-w-2/3 flex items-center justify-between px-2 py-2 border-t mt-4">
      <div className="text-sm text-muted-foreground">
        Showing {start} to {end} of {total} results
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigationToPage(1)}
          disabled={page === 1}
        >
          <ChevronsLeft className="h-4 w-4"></ChevronsLeft>
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigationToPage(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4"></ChevronLeft>
        </Button>

        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">
            Page {page} of {totalPage}
          </span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigationToPage(page + 1)}
          disabled={page === totalPage}
        >
          <ChevronRight className="h-4 w-4"></ChevronRight>
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigationToPage(totalPage)}
          disabled={page === totalPage}
        >
          <ChevronsRight className="h-4 w-4"></ChevronsRight>
        </Button>
      </div>
    </div>
  );
}
