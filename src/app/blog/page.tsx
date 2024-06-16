import { ReactNode } from "react";
import { Category, Connect } from "@/lib/upstash";

const Blog = async () => {
  const client = await Connect();
  const Posts = client.hGetAll(Category.BlogPost);
  console.log(Posts);
  return <div>Blog</div>;
};
export default Blog;
