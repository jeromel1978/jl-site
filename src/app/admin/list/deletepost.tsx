"use client";
import { DeletePost } from "@/actions/blogpost";
import { PostData } from "@/lib/upstash";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@/components/ui/button";

type DeleteProps = {
  Post: PostData;
};

const Delete = ({ Post }: DeleteProps) => {
  return (
    <Button onClick={() => DeletePost(Post)}>
      <DeleteIcon />
    </Button>
  );
};
export default Delete;
