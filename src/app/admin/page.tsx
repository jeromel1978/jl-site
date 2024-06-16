import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Menu from "@/app/admin/menu";
import PostForm from "@/app/admin/postform";

const Admin = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      Admin
      <Menu />
      <PostForm user={session?.user?.name as string} />
    </div>
  );
};

export default Admin;
