import { Suspense } from "react";
import Blogs from "./blogs";

export default function BlogPage() {
  return (
    <div>
      <h1>This is blog page</h1>
      <Suspense fallback={<div>Loading....</div>}>
        <Blogs></Blogs>
      </Suspense>
    </div>
  )
}
