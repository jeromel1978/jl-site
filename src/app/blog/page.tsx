import { Connect, Category } from "@/lib/upstash";
const Blog = async () => {
  const client = await Connect();
  const Posts = await client.hGetAll(`${Category}`);
  console.log(Posts);
  return <div>Blog Main</div>;
};
export default Blog;
