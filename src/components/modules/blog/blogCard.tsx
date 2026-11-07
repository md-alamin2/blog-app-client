import Image from "next/image";
import Link from "next/link";
import { Eye, ImageOff, MessageCircle, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { blogPost } from "@/types";

export type BlogStatus = "PUBLISHED" | "DRAFT" | "ARCHIVED";

interface BlogCardProps {
  blog: blogPost;
  /** Where the card links to. Defaults to /blogs/[id] */
  href?: string;
  /** How many tags to show before collapsing into "+N" */
  maxTags?: number;
  className?: string;
}

const compact = new Intl.NumberFormat("en", { notation: "compact" });

export function BlogCard({ blog, href, maxTags = 3, className }: BlogCardProps) {
  const { id, title, content, thumbnail, isFeatured, status, tags, views, _count } = blog;

  const visibleTags = tags.slice(0, maxTags);
  const hiddenTagCount = tags.length - visibleTags.length;

  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col overflow-hidden pt-0 transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-ring",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <ImageOff className="size-8" aria-hidden="true" />
            <span className="sr-only">No thumbnail</span>
          </div>
        )}

        {(isFeatured || status !== "PUBLISHED") && (
          <div className="absolute left-3 top-3 flex gap-2">
            {isFeatured && (
              <Badge className="gap-1">
                <Star className="size-3 fill-current" aria-hidden="true" />
                Featured
              </Badge>
            )}
            {status !== "PUBLISHED" && (
              <Badge variant="secondary" className="capitalize">
                {status.toLowerCase()}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Title + excerpt */}
      <CardHeader className="gap-2">
        <CardTitle className="line-clamp-2 text-lg leading-snug">
          {/* after:inset-0 stretches this link over the whole card, so the entire card is clickable */}
          <Link
            href={href ?? `/blogs/${id}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {title}
          </Link>
        </CardTitle>
        <p className="line-clamp-2 text-sm text-muted-foreground">{content}</p>
      </CardHeader>

      {/* Tags */}
      <CardContent className="flex-1">
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
            {visibleTags.map((tag) => (
              <li key={tag}>
                <Badge variant="outline" className="font-normal">
                  {tag}
                </Badge>
              </li>
            ))}
            {hiddenTagCount > 0 && (
              <li>
                <Badge variant="outline" className="font-normal text-muted-foreground">
                  +{hiddenTagCount}
                </Badge>
              </li>
            )}
          </ul>
        )}
      </CardContent>

      {/* Stats */}
      <CardFooter className="gap-4 border-t pt-4 text-sm text-muted-foreground [.border-t]:pt-4">
        <span className="inline-flex items-center gap-1.5">
          <Eye className="size-4" aria-hidden="true" />
          <span>
            {compact.format(views)}
            <span className="sr-only"> views</span>
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="size-4" aria-hidden="true" />
          <span>
            {compact.format(_count.comments)}
            <span className="sr-only"> comments</span>
          </span>
        </span>
      </CardFooter>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Usage                                                               */
/* ------------------------------------------------------------------ */
/*
import { BlogCard, type Blog } from "@/components/blog-card";

export default function BlogsPage({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
*/