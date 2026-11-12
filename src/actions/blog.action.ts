"use server"

import { BlogData, blogService } from "@/services/blogs.service";
import { updateTag } from "next/cache";

export const getBlog = async()=>{
    return await blogService.getPost({}, {})
}

export const createPost = async(data: BlogData)=>{
    const res = await blogService.createPost(data)
    updateTag("blogPosts")
    return res
}