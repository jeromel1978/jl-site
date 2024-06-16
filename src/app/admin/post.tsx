import { ReactNode } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
// import { createClient } from "@vercel/kv";
import { createClient } from "redis";

const Admin = async () => {
  const post = {
    id: "1",
    user: "jerome",
    author: "Jerome",
    title: "First Post - Internal",
    body: "So here's my first post.  I hope this works.",
  };
  const options = { url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN };
  //   const client = createClient({
  //     url: `rediss://default:${process.env.UPSTASH_PASSWORD}@${process.env.UPSTASH_URL}:6379`,
  //   });
  //   client.on("error", function (err) {
  //     throw err;
  //   });
  //   await client.connect();
  //   client.hSet(`blog-post:${post.id}`, post);
  //   client.sAdd(`user-posts:${post.user}`, post.id);
  //   console.log(options);
  //   const Client = createClient(options);
  //   Client.hset(`blog-post:${post.id}`, post);
  //   Client.sadd(`user-posts:${post.user}`, post.id);

  //   kv.hset(`blog-post:${post.id}`, post);
  //   kv.sadd(`user-posts:${post.user}`, post.id);

  // const posts = await kv.smembers(`user-posts:${post.user}`)
  return <div>Posted</div>;
};

export default Admin;
