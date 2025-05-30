"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { navItems } from "@/data/nav";
import { CiMenuBurger } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/sign-up");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return null;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-black text-white px-4 lg:px-8 h-16 flex items-center justify-between shadow-md">

      <Link href="/" className="flex items-center gap-2">
        <span className="font-bold font-sans text-3xl md:text-4xl md:font-extrabold">AI Learn</span>
      </Link>

      <nav className="hidden md:flex gap-6 items-center">
      
        <DropdownMenu>
          <DropdownMenuTrigger>  
            Features
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-950 text-white rounded-md shadow-md">
            <DropdownMenuItem asChild>
              <Link
                href="/learn"
                className="px-4 py-2 hover:bg-gray-700 transition-colors rounded-md block"
              >
                Learn
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/quiz"
                className="px-4 py-2 hover:bg-gray-700 transition-colors rounded-md block"
              >
                Quiz
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/story-mode"
                className="px-4 py-2 hover:bg-gray-700 transition-colors rounded-md block"
              >
                Story Mode
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/leetcode"
                className="px-4 py-2 hover:bg-gray-700 transition-colors rounded-md block"
              >
                LeetCode
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {navItems.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm md:text-base font-medium hover:text-gray-300 transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "h-8 w-8 hover:border-2 hover:border-white rounded-full",
              },
            }}
          />
        </SignedIn>
      </nav>

      <div className="md:hidden">
        <Button
          className="text-white focus:outline-none"
          variant="default"
          onClick={toggleMobileMenu}
        >
          <CiMenuBurger />
        </Button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black shadow-lg transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 z-50`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
          <span className="text-xl font-bold text-white">Menu</span>
          <Button
            className="text-white focus:outline-none rounded-full"
            variant="outline"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </Button>
        </div>
        <nav className="flex flex-col items-start gap-8 mt-4 px-4 py-2">
          

          <DropdownMenu>
            <DropdownMenuTrigger> 
            Features
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-950 text-white rounded-md shadow-md">
              <DropdownMenuItem asChild>
                <Link
                  href="/learn"
                  className="px-4 py-2 hover:bg-gray-700 transition-colors rounded-md block"
                >
                  Learn
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/quiz"
                  className="px-4 py-2 hover:bg-gray-700 transition-colors rounded-md block"
                >
                  Quiz
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
              <Link
                href="/story-mode"
                className="px-4 py-2 hover:bg-gray-700 transition-colors rounded-md block"
              >
                Story Mode
              </Link>
            </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/leetcode"
                  className="px-4 py-2 hover:bg-gray-700 transition-colors rounded-md block"
                >
                  LeetCode
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {navItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-white hover:text-gray-300 transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              {link.label}
            </Link>
          ))}

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-12 w-12 border-2 border-white rounded-full",
                },
              }}
            />
          </SignedIn>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;