import { createClient } from "redis";

export const Category = {
  BlogPost: "blog-post",
  BlogUserPost: "blog-user-post",
};

export const Connect = async () => {
  const client = await createClient({
    url: `rediss://default:${process.env.UPSTASH_PASSWORD}@${process.env.UPSTASH_URL}:6379`,
  })
    .on("error", function (err) {
      throw err;
    })
    .connect();
  return client;
};
