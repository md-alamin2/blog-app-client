import HistoryTable from "@/components/modules/user/history/historyTable";
import PaginationControls from "@/components/ui/pagination-controls";
import { blogService } from "@/services/blogs.service";

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const { data } = await blogService.getPost({ limit: 4, page }, {});
  const posts = data.data?.result || [];
  const pagination = data.data.paginationData || {
    total: 7,
    page: 1,
    limit: 4,
    totalPage: 2,
  };
  return (
    <div>
      <h1 className="text-2xl mb-5">Blog post History</h1>
      <HistoryTable posts={posts}></HistoryTable>

      <PaginationControls meta={pagination}></PaginationControls>
    </div>
  );
}
