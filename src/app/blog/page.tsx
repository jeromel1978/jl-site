import { ReactNode } from "react";
import { Category, Connect } from "@/lib/upstash";

const Blog = async () => {
  const client = await Connect();
  const Posts = await client.hgetall(Category.BlogPost);
  console.log(Category.BlogPost, Posts);
  return <div>Blog</div>;
};
export default Blog;
