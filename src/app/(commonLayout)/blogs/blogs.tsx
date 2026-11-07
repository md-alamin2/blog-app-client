import { BlogCard } from '@/components/modules/blog/blogCard'
import { blogService } from '@/services/blogs.service'
import { blogPost } from '@/types'
import React from 'react'

export default async function Blogs() {
    const {data} = await blogService.getPost({isFeatured: true, search:""},{caches:"no-store"})
  return (
    <div className='grid grid-cols-4 gap-5 max-w-7xl mx-auto'>
      {data?.data?.result?.map(((post:blogPost) =>  (
        <BlogCard key={post.id} blog={post}></BlogCard>
      )))}
    </div>
  )
}
