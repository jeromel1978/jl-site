import { Connect, Category } from "@/lib/upstash";

export type PostData = {
  id: string;
  user: string;
  author: string;
  title: string;
  body: string;
};

export const AddPost = async (Data: PostData) => {
  const client = await Connect();
  const Posts = await client.hGetAll(`${Category}`);
  client.hSet(`${Category.BlogPost}:${Data.id}`, Data);
  client.sAdd(`${Category.BlogUserPost}:${Data.user}`, Data.id);
};

export const GetPosts = async (Data: PostData) => {
  const client = await Connect();
  const Posts = await client.hGetAll(`${Category.BlogPost}`);
  return Posts;
};
