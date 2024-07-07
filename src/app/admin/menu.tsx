"use client";
import { ReactNode } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { AddPost } from "@/actions/blogpost";
import type { PostData } from "@/lib/upstash";

const Menu = () => {
  return (
    <div>
      <Button onClick={() => (document.location = "./list")}>List</Button>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default Menu;
