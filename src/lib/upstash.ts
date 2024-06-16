import { Redis } from "@upstash/redis";

export type PostData = {
  id: string;
  user: string;
  author: string;
  title: string;
  body: string;
};

export const Category = {
  BlogPost: "blog-post",
  BlogUserPost: "blog-user-post",
};

export const Connect = async () => {
  // console.log(process.env.UPSTASH_URL, process.env.UPSTASH_PASSWORD);
  const client = new Redis({
    url: `rediss://${process.env.UPSTASH_URL}`,
    token: process.env.UPSTASH_PASSWORD,
  });
  return client;
};
