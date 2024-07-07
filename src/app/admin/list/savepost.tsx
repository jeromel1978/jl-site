"use client";
import { DeletePost } from "@/actions/blogpost";
import { PostData } from "@/lib/upstash";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@/components/ui/button";

type DeleteProps = {
  Post: PostData;
};

const Save = ({ Post }: DeleteProps) => {
  return (
    <Button onClick={() => DeletePost(Post)}>
      <SaveIcon />
    </Button>
  );
};
export default Save;
