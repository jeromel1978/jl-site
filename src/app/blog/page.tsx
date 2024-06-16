import { ReactNode } from "react";
import { kv } from "@vercel/kv";
type post = { id: string; title: string; body: string; img: string };
export const Post = async () => {
  const posts = await kv.hgetall(`blog:post`);
  console.log(posts);
  return <div>test</div>;
};

export default Post;
