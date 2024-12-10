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
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const isLoggedIn = false; // TODO: Implement auth state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { href: '/video-call', label: 'Video Call' },
    { href: '/progress', label: 'Progress' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <header className="border-b bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            PARVATI.AI
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${isActive(link.href) ? 'text-purple-600' : 'text-gray-600'} hover:text-purple-600 transition-colors`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          {/* Auth/Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/default-avatar.png" alt="User avatar" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/progress">Progress</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col space-y-4 py-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${
                    isActive(link.href) ? 'text-purple-600' : 'text-gray-600'
                  } hover:text-purple-600 transition-colors px-4 py-2`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!isLoggedIn && (
                <div className="flex flex-col space-y-2 px-4 pt-4 border-t">
                  <Link href="/auth/login">
                    <Button variant="ghost" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}