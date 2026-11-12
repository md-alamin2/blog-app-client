"use client"
import { createPost } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { env } from "@/env";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must have 3 character")
    .max(200, "Title can have max 200 character"),
  content: z
    .string()
    .min(10, "Content must have 10 character")
    .max(500, "Content can have max 500 character"),
  status: z.string(),
  tags: z.string(),
});

export default function CreateBlogFormClient() {
  //   const createBlog = async (formData: FormData) => {
  //     "use server";

  //     const title = formData.get("title") as string;
  //     const content = formData.get("content") as string;
  //     const tags = formData.get("tags") as string;

  //     const blogData = {
  //       title,
  //       content,
  //       status: "PUBLISHED",
  //       tags: tags
  //         .split(",")
  //         .map((tag) => tag.trim())
  //         .filter((item) => item !== ""),
  //     };

  //     const cookieStore = await cookies();

  //     const res = await fetch(`${API_URL}/posts`, {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //         Cookie: cookieStore.toString(),
  //       },
  //       body: JSON.stringify(blogData),
  //     });

  //     if (res.ok) {
  //       revalidateTag("blogPosts", "max");
  //     }
  //   };

  //   create blog

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      status: "PUBLISHED",
      tags: "",
    },
    validators: {
      onSubmit: blogSchema,
    },
    onSubmit: async ({value}) => {
      const blogData = {
        ...value,
        tags: value.tags.split(",")
        .map((tag) => tag.trim())
        .filter((item) => item !== "")
      }
        await toast.promise(createPost(blogData), {
        loading: "Creating Blog.....",
        success: (result) => {
          if (result.error) {
            throw new Error(result.error.message);
          }
          return "Blog created Successfully";
        },
        error: (error) => 
          toast.add({
            type: "error",
            description: error.message || "Something went wrong!",
            priority: "high",
          })
      });
    },
  });
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create blog</CardTitle>
          <CardDescription>You can write your blog here</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="blog-form"
            onSubmit={(e) => {
              (e.preventDefault(), form.handleSubmit());
            }}
          >
            <FieldGroup>
              <form.Field
                name="title"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                      <Input
                        id={field.name}
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        placeholder="Blog title"
                        onChange={(e)=>{field.handleChange(e.target.value)}}
                      ></Input>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </Field>
                  );
                }}
              ></form.Field>
              <form.Field
                name="content"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder="Blog title"
                        onChange={(e)=>{field.handleChange(e.target.value)}}
                      ></Textarea>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </Field>
                  );
                }}
              ></form.Field>
              <form.Field
                name="tags"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Tags (comma separated)
                      </FieldLabel>
                      <Input
                        id={field.name}
                        type="text"
                        name={field.name}
                        value={field.state.value}
                        placeholder="Blog title"
                        onChange={(e)=>{field.handleChange(e.target.value)}}
                      ></Input>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </Field>
                  );
                }}
              ></form.Field>
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
