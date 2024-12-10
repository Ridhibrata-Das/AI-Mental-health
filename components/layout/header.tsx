"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const isLoggedIn = false; // TODO: Implement auth state

  return (
    <header className="border-b bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            PARVATI.AI
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/video-call"
              className={`${isActive('/video-call') ? 'text-purple-600' : 'text-gray-600'} hover:text-purple-600 transition-colors`}
            >
              Video Call
            </Link>
            <Link 
              href="/progress"
              className={`${isActive('/progress') ? 'text-purple-600' : 'text-gray-600'} hover:text-purple-600 transition-colors`}
            >
              Progress
            </Link>
            <Link 
              href="/about"
              className={`${isActive('/about') ? 'text-purple-600' : 'text-gray-600'} hover:text-purple-600 transition-colors`}
            >
              About Us
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/progress">Progress</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}