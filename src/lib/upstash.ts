import Redis from "ioredis";

export type PostData = {
  id: string;
  user: string;
  title: string;
  body: string;
};

export const Category = {
  BlogPost: "blog-post",
  BlogUserPost: "blog-user-post",
};

export const Connect = async () => {
  // console.log(process.env.UPSTASH_URL, process.env.UPSTASH_PASSWORD);
  const client = new Redis(`rediss://default:${process.env.UPSTASH_PASSWORD}@${process.env.UPSTASH_URL}:6379`);
  return client;
};
