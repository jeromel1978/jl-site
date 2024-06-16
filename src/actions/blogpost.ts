"use server";
import { PostData, Connect, Category } from "@/lib/upstash";

export const AddPost = async (Data: PostData) => {
  const client = await Connect();
  // const Posts = await client.hgetall(`${Category}`);
  // const a = await fetch("https://picsum.photos/200/300");
  // console.log("got", a);
  console.log("Posting", Category.BlogPost, Data);
  // const hset = await client.hset(`${Category.BlogPost}`, Data);
  const hset = await client.hset(`${Category.BlogPost}:${Data.id}`, Data);
  console.log("Assigning to User", hset);
  await client.sadd(`${Category.BlogUserPost}:${Data.user}`, Data.id);
};

export const GetPosts = async () => {
  const client = await Connect();
  const Posts = await client.hgetall(`${Category.BlogPost}`);
  return Posts;
};
