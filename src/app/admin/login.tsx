"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return <Button onClick={() => signIn()}>Login</Button>;
}
