import { ReactNode } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { kv } from "@vercel/kv";
// import { createClient } from "@vercel/kv";

const Admin = () => {
  const post = {
    id: "1",
    user: "jerome",
    author: "Jerome",
    title: "First Post - Internal",
    body: "So here's my first post.  I hope this works.",
  };
  const options = { url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN };
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
