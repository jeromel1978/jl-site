import { GetPosts } from "@/actions/blogpost";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type BlogParams = {
  params: {
    id: string;
  };
};
const Blog = async ({ params }: BlogParams) => {
  const Posts = await GetPosts(params.id as string);
  return (
    <div className="flex flex-col gap-4 p-2">
      <h1 className="flex font-extrabold text-3xl w-full justify-center">{params.id}'s Blog</h1>
      {Posts.map((Post) => (
        <Card key={`${Post.user}${Post.id}`}>
          <CardHeader>
            <CardTitle>{Post.title}</CardTitle>
            <CardDescription>
              Posted by {Post.user} on {new Date(parseInt(Post.id)).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>{Post.body}</CardContent>
        </Card>
      ))}
    </div>
  );
};
export default Blog;
