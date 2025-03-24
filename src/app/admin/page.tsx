"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Admin() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as { role: number };

  if (!user) {
    return router.push("/register");
  }

  if (user.role !== 2)
    return <div>You do not have permission to access this page.</div>;

  return <div>Bienvenido morro</div>;
}
