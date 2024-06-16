import { ReactNode } from "react";
type PageParams = {
  params: { id: string };
};
export default function Post({ params }: PageParams) {
  return <div>{params.id}</div>;
}
