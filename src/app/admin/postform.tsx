"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import { AddPost } from "@/actions/blogpost";
import type { PostData } from "@/lib/upstash";
type PostParams = {
  user: string;
};
const Post = ({ user }: PostParams) => {
  const [Title, setTitle] = useState<string>("");
  const [Body, setBody] = useState<string>("");
  const [Picture, setPicture] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const SubmitPost = async () => {
    const Data: PostData = {
      id: new Date().valueOf().toString(),
      user: user,
      title: Title,
      body: Body,
    };
    const Res = await AddPost(Data);
    if (!!Res)
      toast("Blog Post", {
        description: "Blog Post is Posted",
      });
    // if (!!Res) toast({ title: "JLSite", description: "Blog Post is Posted" });
  };

  return (
    <div className="w-fit">
      <div className="grid grid-cols-2 w-fit  gap-2">
        <div className="flex justify-end align-middle">Title</div>
        <div>
          <Input onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="flex justify-end align-middle">Body</div>
        <div>
          <Textarea onChange={(e) => setBody(e.target.value)} />
        </div>
        <div className="flex justify-end align-middle">Image</div>
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </div>
      </div>
      <Button onClick={SubmitPost}>Post</Button>
    </div>
  );
};

export default Post;
