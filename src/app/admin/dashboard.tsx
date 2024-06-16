"use client";
import { ReactNode } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { kv } from "@vercel/kv";
import Post from "./post";

const Admin = () => {
  return (
    <div>
      <Post />
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default Admin;
