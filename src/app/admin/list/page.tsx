import { GetPosts } from "@/actions/blogpost";
import PostComponent from "./post";

const List = async () => {
  const user = "Jerome";
  const Posts = await GetPosts(user as string);
  return (
    <div className="flex flex-col gap-4 p-2">
      {Posts.sort((a, b) => parseInt(b.id) - parseInt(a.id)).map((Post) => (
        <PostComponent key={Post.id} Post={Post} />
      ))}
    </div>
  );
};
export default List;
