import { ReactNode } from "react";

type PostParams = {
  params: { id: string };
};

export default function Blog({ params }: PostParams) {
  return <div>Post: {params.id}</div>;
}
