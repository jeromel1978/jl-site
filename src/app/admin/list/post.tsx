"use client";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Delete from "./deletepost";
import Save from "./savepost";
import { PostData } from "@/lib/upstash";

type PostProps = {
  Post: PostData;
};
const CADate = new Intl.DateTimeFormat("en-CA");
const PostComponent = ({ Post }: PostProps) => {
  const [Title, setTitle] = useState<string>(Post.title);
  const [Body, setBody] = useState<string>(Post.body);
  return (
    <Card key={Post.id}>
      <CardHeader>
        <CardTitle>
          <Input defaultValue={Post.title} onChange={(e) => setBody(e.target.value)} />
          <Delete Post={Post} />
        </CardTitle>
        <CardDescription>
          Posted by {Post.user} on {CADate.format(new Date(parseInt(Post.id)))}
        </CardDescription>
      </CardHeader>
      <Textarea onChange={(e) => setTitle(e.target.value)} defaultValue={Post.body}></Textarea>
      <Save Post={{ ...Post, title: Title, body: Body }} />
    </Card>
  );
};
export default PostComponent;
