import { Inter as FontSans } from "next/font/google";

import { ReactNode } from "react";

type RootProps = {
  children: ReactNode;
};
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: RootProps) {
  return <div>test</div>;
}
