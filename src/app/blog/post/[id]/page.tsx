import { Inter as FontSans } from "next/font/google";

import { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  params?: { id: string };
};
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children, params }: PageProps) {
  return <div>{params?.id ?? "No ID"}</div>;
}
