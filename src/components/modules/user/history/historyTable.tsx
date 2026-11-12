import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { blogPost } from "@/types";

export default async function HistoryTable({ posts }: { posts: blogPost[] }) {
  return (
    <div className="max-w-2/3 border-2 border-white-50 rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.tags}</TableCell>
              <TableCell >{post.views}</TableCell>
              <TableCell>{post._count.comments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
