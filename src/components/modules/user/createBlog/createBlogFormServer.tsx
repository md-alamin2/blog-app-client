import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export default function CreateBlogFormServer() {
  const createBlog = async (formData: FormData) => {
    "use server";

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;

    const blogData = {
      title,
      content,
      status: "PUBLISHED",
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((item) => item !== ""),
    };

    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(blogData),
    });
    
    if (res.ok) {
      revalidateTag("blogPosts", "max");
    }
  };
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create blog</CardTitle>
          <CardDescription>You can write your blog here</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="blog-form" action={createBlog}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Blog title"
                  required
                ></Input>
              </Field>
              <Field>
                <FieldLabel htmlFor="content">Content</FieldLabel>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog"
                  required
                ></Textarea>
              </Field>
              <Field>
                <FieldLabel htmlFor="tags">Tags (comma separated)</FieldLabel>
                <Input id="tags" name="tags" placeholder="nextjs, web"></Input>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button form="blog-form" type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
