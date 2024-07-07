"use server";
import { PostData, Connect, Category } from "@/lib/upstash";

export const AddPost = async (Data: PostData) => {
  const client = await Connect();
  const hset = await client.hset(`${Category.BlogPost}:${Data.id}`, Data);
  const sadd = await client.sadd(`${Category.BlogUserPost}:${Data.user}`, Data.id);
  return true;
};

export const SavePost = async (Data: PostData) => {
  const client = await Connect();
  const hset = await client.hset(`${Category.BlogPost}:${Data.id}`, Data);
  return true;
};

export const GetPosts = async (User: string) => {
  const client = await Connect();
  const PostIndex = await client.smembers(`${Category.BlogUserPost}:${User}`);
  const Posts: PostData[] = [];
  for (const Index of PostIndex) {
    // Post.push( await client.hgetall(`${Category.BlogPost}:${Index}`))
    const Res = await client.hgetall(`${Category.BlogPost}:${Index}`);
    Posts.push(Res as PostData);
  }
  return Posts;
};

export const DeletePost = async (Data: PostData) => {
  const client = await Connect();
  const sdel = await client.srem(`${Category.BlogUserPost}:${Data.user}`, Data.id);
  const hset = await client.hdel(`${Category.BlogPost}:${Data.id}`);
  return true;
};
