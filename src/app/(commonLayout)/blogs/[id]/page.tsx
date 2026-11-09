// app/blogs/[id]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Eye, MessageCircle, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blogs.service";
import { blogPost } from "@/types";

// export async function generateStaticParams() {
//   const { data: posts } = await blogService.getPost(
//     { isFeatured: false },
//     { caches: "no-store" },
//   );

//   return posts.result.map((post: blogPost) => ({ id: post.id })).splice(0, 3);
// }

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: blog } = await blogService.getPostById(id);

  if (!blog) notFound();

  const { title, content, thumbnail, isFeatured, status, tags, views, _count } =
    blog;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <Button
        render={
          <Link href="/blogs">
            <ArrowLeft className="size-4" aria-hidden="true" />
            All blogs
          </Link>
        }
        variant="ghost"
        size="sm"
        className="-ml-3 mb-6"
      ></Button>

      <article>
        <header className="space-y-4">
          {(isFeatured || status !== "PUBLISHED") && (
            <div className="flex gap-2">
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

          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {title}
          </h1>

          {/* <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Eye className="size-4" aria-hidden="true" />
              {compact.format(views)} views
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="size-4" aria-hidden="true" />
              {compact.format(_count.comments)}{" "}
              {_count.comments === 1 ? "comment" : "comments"}
            </span>
          </div> */}

          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
              {tags.map((tag: string) => (
                <li key={tag}>
                  <Badge variant="outline" className="font-normal">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </header>

        {thumbnail && (
          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={thumbnail}
              alt={title}
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {/*
          `content` is rendered as plain text here. If you store markdown,
          swap this <div> for react-markdown inside a "prose" wrapper
          (needs @tailwindcss/typography).
        */}
        <div className="mt-8 whitespace-pre-line text-base leading-7 text-foreground/90">
          {content}
        </div>
      </article>

      <section
        aria-labelledby="comments-heading"
        className="mt-12 border-t pt-8"
      >
        <h2 id="comments-heading" className="text-xl font-semibold">
          Comments ({_count.comments})
        </h2>
        {_count.comments === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No comments yet.</p>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Load and render your comment list here.
          </p>
        )}
      </section>
    </main>
  );
}
