"use client";
import { ReactNode } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { AddPost } from "@/actions/blogpost";
import type { PostData } from "@/actions/blogpost";

const Admin = () => {
  const Post: PostData = {
    id: "1",
    user: "jerome",
    author: "Jerome",
    title: "First Post - Internal",
    body: "So here's my first post.  I hope this works.",
  };
  return (
    <div>
      {/* <Post /> */}

      <Button onClick={() => AddPost(Post)}>Add Post</Button>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default Admin;
