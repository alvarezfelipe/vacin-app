import Navbar from "@/components/dashboard/common/Navbar";
import React from "react";

export default function Default({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <React.Fragment>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900">{children}</main>
    </React.Fragment>
  );
}
