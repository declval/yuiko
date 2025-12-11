"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function activeLinkClass(pathname: string, href: string): string {
  if (pathname === href) {
    return "text-blue-300";
  } else {
    return "hover:text-blue-200";
  }
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="flex justify-center">
      <nav className="flex flex-col gap-4 items-center lg:flex-row max-w-4xl py-4 w-full">
        <Link className={activeLinkClass(pathname, "/")} href="/">
          Practice
        </Link>
        <Link
          className={activeLinkClass(pathname, "/settings")}
          href="/settings"
        >
          Settings
        </Link>
      </nav>
    </header>
  );
}
